<?php

namespace App\Http\Controllers;

use App\Models\Policy;
use App\Models\Driver;
use App\Models\Vehicle;
use App\Models\Coverage;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf; 

class PolicyController extends Controller
{
    // Get a list of all policies
    public function index()
    {
        $policies = Policy::with(['policyHolder','drivers', 'vehicles.coverages'])->get();
        return response()->json($policies);
    }

    // Store a new policy
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'policy_no' => 'required|string',
            'policy_status' => 'required|string',
            'policy_type' => 'required|string',
            'policy_effective_date' => 'required|date',
            'policy_expiration_date' => 'required|date',
            'policy_holder.first_name' => 'required|string',
            'policy_holder.last_name' => 'required|string',
            'policy_holder.address.street' => 'required|string',
            'policy_holder.address.city' => 'required|string',
            'policy_holder.address.state' => 'required|string',
            'policy_holder.address.zip' => 'required|string',
            'drivers' => 'required|array',
            'drivers.*.first_name' => 'required|string',
            'drivers.*.last_name' => 'required|string',
            'drivers.*.age' => 'required|integer',
            'drivers.*.gender' => 'required|string',
            'drivers.*.marital_status' => 'required|string',
            'drivers.*.license_number' => 'required|string',
            'drivers.*.license_state' => 'required|string',
            'drivers.*.license_status' => 'required|string',
            'drivers.*.license_effective_date' => 'required|date',
            'drivers.*.license_expiration_date' => 'required|date',
            'drivers.*.license_class' => 'required|string',
            'vehicles' => 'required|array',
            'vehicles.*.year' => 'required|integer',
            'vehicles.*.make' => 'required|string',
            'vehicles.*.model' => 'required|string',
            'vehicles.*.vin' => 'required|string',
            'vehicles.*.usage' => 'required|string',
            'vehicles.*.primary_use' => 'required|string',
            'vehicles.*.annual_mileage' => 'required|integer',
            'vehicles.*.ownership' => 'required|string',
            'vehicles.*.garaging_address.street' => 'required|string',
            'vehicles.*.garaging_address.city' => 'required|string',
            'vehicles.*.garaging_address.state' => 'required|string',
            'vehicles.*.garaging_address.zip' => 'required|string',
            'vehicles.*.coverages' => 'required|array',
            'vehicles.*.coverages.*.type' => 'required|string',
            'vehicles.*.coverages.*.limit' => 'required|integer',
            'vehicles.*.coverages.*.deductible' => 'required|integer',
        ]);
    
        // Create the policy
        $policy = Policy::create([
            'policy_no' => $validatedData['policy_no'],
            'policy_status' => $validatedData['policy_status'],
            'policy_type' => $validatedData['policy_type'],
            'policy_effective_date' => $validatedData['policy_effective_date'],
            'policy_expiration_date' => $validatedData['policy_expiration_date'],
        ]);

        $policyHolder = $policy->policyHolder()->create([
            'first_name' => $validatedData['policy_holder']['first_name'],
            'last_name' => $validatedData['policy_holder']['last_name'],
            'street' => $validatedData['policy_holder']['address']['street'],
            'city' => $validatedData['policy_holder']['address']['city'],
            'state' => $validatedData['policy_holder']['address']['state'],
            'zip' => $validatedData['policy_holder']['address']['zip'],
        ]);
        
    
        // Create the drivers
        foreach ($validatedData['drivers'] as $driverData) {
            $policy->drivers()->create($driverData);
        }
    
        // Create the vehicles with garaging address and coverages
        foreach ($validatedData['vehicles'] as $vehicleData) {
            $vehicle = $policy->vehicles()->create([
                'year' => $vehicleData['year'],
                'make' => $vehicleData['make'],
                'model' => $vehicleData['model'],
                'vin' => $vehicleData['vin'],
                'usage' => $vehicleData['usage'],
                'primary_use' => $vehicleData['primary_use'],
                'annual_mileage' => $vehicleData['annual_mileage'],
                'ownership' => $vehicleData['ownership'],
                'garaging_street' => $vehicleData['garaging_address']['street'],
                'garaging_city' => $vehicleData['garaging_address']['city'],
                'garaging_state' => $vehicleData['garaging_address']['state'],
                'garaging_zip' => $vehicleData['garaging_address']['zip'],
            ]);
    
            // Create coverages for each vehicle
            foreach ($vehicleData['coverages'] as $coverageData) {
                $vehicle->coverages()->create($coverageData);
            }
        }
    
        return response()->json($policy->load(['drivers', 'vehicles.coverages']), 201);
    }

    // Show a specific policy
    public function show($id)
    {
        $policy = Policy::with(['policyHolder','drivers', 'vehicles.coverages'])->findOrFail($id);
        return response()->json($policy);
    }

    // Update a specific policy
    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'policy_no' => 'sometimes|required|string',
            'policy_status' => 'sometimes|required|string',
            'policy_type' => 'sometimes|required|string',
            'policy_effective_date' => 'sometimes|required|date',
            'policy_expiration_date' => 'sometimes|required|date',
            'policy_holder.first_name' => 'sometimes|required|string',
            'policy_holder.last_name' => 'sometimes|required|string',
            'policy_holder.address.street' => 'sometimes|required|string',
            'policy_holder.address.city' => 'sometimes|required|string',
            'policy_holder.address.state' => 'sometimes|required|string',
            'policy_holder.address.zip' => 'sometimes|required|string',
            'drivers' => 'sometimes|array',
            'vehicles' => 'sometimes|array',
        ]);

        $policy = Policy::findOrFail($id);
        $policy->update($validatedData);

        $policy->update([
            'policy_no' => $validatedData['policy_no'] ?? $policy->policy_no,
            'policy_status' => $validatedData['policy_status'] ?? $policy->policy_status,
            'policy_type' => $validatedData['policy_type'] ?? $policy->policy_type,
            'policy_effective_date' => $validatedData['policy_effective_date'] ?? $policy->policy_effective_date,
            'policy_expiration_date' => $validatedData['policy_expiration_date'] ?? $policy->policy_expiration_date,
        ]);
    
        // Update the policy_holder details
        if (isset($validatedData['policy_holder'])) {
            $policyHolderData = [
                'first_name' => $validatedData['policy_holder']['first_name'],
                'last_name' => $validatedData['policy_holder']['last_name'],
                'street' => $validatedData['policy_holder']['address']['street'],
                'city' => $validatedData['policy_holder']['address']['city'],
                'state' => $validatedData['policy_holder']['address']['state'],
                'zip' => $validatedData['policy_holder']['address']['zip'],
            ];
    
            $policy->policyHolder()->updateOrCreate([], $policyHolderData);
        }

        if (isset($validatedData['drivers'])) {
            foreach ($validatedData['drivers'] as $driverData) {
                $policy->drivers()->updateOrCreate(
                    ['license_number' => $driverData['license_number']], // Unique field to match drivers
                    $driverData
                );
            }
        }

        if (isset($validatedData['vehicles'])) {
            foreach ($validatedData['vehicles'] as $vehicleData) {
                // Update or create vehicle
                $vehicle = $policy->vehicles()->updateOrCreate(
                    ['vin' => $vehicleData['vin']], // Unique field to match vehicles
                    [
                        'year' => $vehicleData['year'],
                        'make' => $vehicleData['make'],
                        'model' => $vehicleData['model'],
                        'vin' => $vehicleData['vin'],
                        'usage' => $vehicleData['usage'],
                        'primary_use' => $vehicleData['primary_use'],
                        'annual_mileage' => $vehicleData['annual_mileage'],
                        'ownership' => $vehicleData['ownership'],
                        'garaging_street' => $vehicleData['garaging_address']['street'],
                        'garaging_city' => $vehicleData['garaging_address']['city'],
                        'garaging_state' => $vehicleData['garaging_address']['state'],
                        'garaging_zip' => $vehicleData['garaging_address']['zip'],
                    ]
                );
        
                // Handle coverages for each vehicle
                if (isset($vehicleData['coverages'])) {
                    foreach ($vehicleData['coverages'] as $coverageData) {
                        $vehicle->coverages()->updateOrCreate(
                            ['type' => $coverageData['type']], // Assuming 'type' is unique for each coverage in a vehicle
                            $coverageData
                        );
                    }
                }
            }
        }

        return response()->json($policy->load(['drivers', 'vehicles.coverages']));
    }

    // Delete a policy
    public function destroy($id)
    {
        $policy = Policy::findOrFail($id);
        $policy->delete();

        return response()->json(['message' => 'Policy deleted successfully']);
    }

    public function generatePDF($id)
{
    $policy = Policy::with(['policyHolder', 'drivers', 'vehicles.coverages'])->findOrFail($id);

    // Pass the data to a view
    $pdf = Pdf::loadView('pdf.policy', ['policy' => $policy]);

    // Download the PDF
    return $pdf->download('policy_' . $policy->policy_no . '.pdf');
}
}
