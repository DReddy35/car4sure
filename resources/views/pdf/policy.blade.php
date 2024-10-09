<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Policy PDF</title>
    <style>
        body { font-family: DejaVu Sans, sans-serif; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
        th, td { padding: 8px; border: 1px solid #ddd; }
        th { background-color: #f4f4f4; }
    </style>
</head>
<body>
    <h1>Policy Details</h1>
    <p><strong>Policy Number:</strong> {{ $policy->policy_no }}</p>
    <p><strong>Status:</strong> {{ $policy->policy_status }}</p>
    <p><strong>Type:</strong> {{ $policy->policy_type }}</p>
    <p><strong>Effective Date:</strong> {{ $policy->policy_effective_date }}</p>
    <p><strong>Expiration Date:</strong> {{ $policy->policy_expiration_date }}</p>

    <h2>Policy Holder Information</h2>
    <p><strong>Name:</strong> {{ $policy->policyHolder->first_name }} {{ $policy->policyHolder->last_name }}</p>
    <p><strong>Address:</strong> {{ $policy->policyHolder->street }}, {{ $policy->policyHolder->city }}, {{ $policy->policyHolder->state }}, {{ $policy->policyHolder->zip }}</p>

    <h2>Drivers</h2>
    <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Age</th>
                <th>License Number</th>
                <th>License Status</th>
            </tr>
        </thead>
        <tbody>
            @foreach($policy->drivers as $driver)
            <tr>
                <td>{{ $driver->first_name }} {{ $driver->last_name }}</td>
                <td>{{ $driver->age }}</td>
                <td>{{ $driver->license_number }}</td>
                <td>{{ $driver->license_status }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>

    <h2>Vehicles</h2>
    @foreach($policy->vehicles as $vehicle)
    <h3>Vehicle: {{ $vehicle->make }} {{ $vehicle->model }} ({{ $vehicle->year }})</h3>
    <p><strong>VIN:</strong> {{ $vehicle->vin }}</p>
    <p><strong>Usage:</strong> {{ $vehicle->usage }}</p>
    <h4>Coverages:</h4>
    <ul>
        @foreach($vehicle->coverages as $coverage)
        <li>{{ $coverage->type }} - Limit: {{ $coverage->limit }}, Deductible: {{ $coverage->deductible }}</li>
        @endforeach
    </ul>
    @endforeach
</body>
</html>