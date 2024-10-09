import React, { useState, useEffect } from 'react';
import InputField from './InputField';
import SubmitButton from './SubmitButton';
import axios from 'axios';

const CreateClaim = ({ selectedPolicy, mode, policy_id }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    policy_no: '',
    policy_status: '',
    policy_type: '',
    policy_effective_date: '',
    policy_expiration_date: '',
    policy_holder: {
      first_name: '',
      last_name: '',
      address: {
        street: '',
        city: '',
        state: '',
        zip: ''
      }
    },
    drivers: [
      {
        first_name: '',
        last_name: '',
        age: '',
        gender: '',
        marital_status: '',
        license_number: '',
        license_state: '',
        license_status: '',
        license_effective_date: '',
        license_expiration_date: '',
        license_class: '',
      }
    ],
    vehicles: [
      {
        year: '',
        make: '',
        model: '',
        vin: '',
        usage: '',
        primary_use: '',
        annual_mileage: '',
        ownership: '',
        garaging_address: {
          street: '',
          city: '',
          state: '',
          zip: ''
        },
        coverages: [
          {
            type: '',
            limit: 0,
            deductible: 0
          }
        ]
      }
    ]
  });

  

  const mapBackendToFrontend = (policyData) => {
    if (!policyData) return; // If no policyData, return

    const transformedPolicyHolder = {
      first_name: policyData.policy_holder.first_name || '',
      last_name: policyData.policy_holder.last_name || '',
      address: {
        street: policyData.policy_holder.street || '',
        city: policyData.policy_holder.city || '',
        state: policyData.policy_holder.state || '',
        zip: policyData.policy_holder.zip || '',
      },
    };

    const transformedVehicles = policyData.vehicles.map(vehicle => ({
      year: vehicle.year || '',
      make: vehicle.make || '',
      model: vehicle.model || '',
      vin: vehicle.vin || '',
      usage: vehicle.usage || '',
      primary_use: vehicle.primary_use || '',
      annual_mileage: vehicle.annual_mileage || '',
      ownership: vehicle.ownership || '',
      garaging_address: {
        street: vehicle.garaging_street || '',
        city: vehicle.garaging_city || '',
        state: vehicle.garaging_state || '',
        zip: vehicle.garaging_zip || '',
      },
      coverages: vehicle.coverages.map(coverage => ({
        type: coverage.type || '',
        limit: coverage.limit || '',
        deductible: coverage.deductible || ''
      }))
    }));

    const transformedFormData = {
      policy_no: policyData.policy_no || '',
      policy_status: policyData.policy_status || '',
      policy_type: policyData.policy_type || '',
      policy_effective_date: policyData.policy_effective_date || '',
      policy_expiration_date: policyData.policy_expiration_date || '',
      policy_holder: transformedPolicyHolder,
      drivers: policyData.drivers || [],
      vehicles: transformedVehicles,
    };

    // Update the formData state with the transformed data
    setFormData(transformedFormData);
  };

  // useEffect(() => {
  //   if (selectedPolicy) {
  //     console.log(selectedPolicy)
  //     setFormData(selectedPolicy);
  //   }
  // }, [selectedPolicy]);
  useEffect(() => {
    if (selectedPolicy) {
      mapBackendToFrontend(selectedPolicy);
    }
  }, [selectedPolicy]); 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleNestedChange = (e, path) => {
    const { name, value } = e.target;
    setFormData(prevData => {
      const updatedData = { ...prevData };
      let currentLevel = updatedData;

      // Traverse the path to reach the desired property
      path.forEach((key, index) => {
        if (index === path.length - 1) {
          if (typeof currentLevel[key] !== 'object') {
            currentLevel[key] = {};
          }
          currentLevel[key][name] = value;
        } else {
          if (!currentLevel[key]) currentLevel[key] = {};
          currentLevel = currentLevel[key];
        }
      });

      return updatedData;
    });
  };

  const addDriver = () => {
    setFormData((prevData) => ({
      ...prevData,
      drivers: [...prevData.drivers, {
        first_name: '',
        last_name: '',
        age: '',
        gender: '',
        marital_status: '',
        license_number: '',
        license_state: '',
        license_status: '',
        license_effective_date: '',
        license_expiration_date: '',
        license_class: '',
      }]
    }));
  };

  const removeDriver = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      drivers: prevData.drivers.filter((_, i) => i !== index)
    }));
  };

  const addVehicle = () => {
    setFormData((prevData) => ({
      ...prevData,
      vehicles: [...prevData.vehicles, {
        year: '',
        make: '',
        model: '',
        vin: '',
        usage: '',
        primary_use: '',
        annual_mileage: '',
        ownership: '',
        garaging_address: {
          street: '',
          city: '',
          state: '',
          zip: ''
        },
        coverages: [
          {
            type: '',
            limit: '',
            deductible: ''
          }
        ]
      }]
    }));
  };

  const removeVehicle = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      vehicles: prevData.vehicles.filter((_, i) => i !== index)
    }));
  };

  const addCoverage = (vehicleIndex) => {
    const newVehicles = [...formData.vehicles];
    newVehicles[vehicleIndex].coverages.push({
      type: '',
      limit: '',  // Ensure this field is included
      deductible: '',
    });
    setFormData({ ...formData, vehicles: newVehicles });
  };

  const removeCoverage = (vehicleIndex, coverageIndex) => {
    const updatedVehicles = [...formData.vehicles];
    updatedVehicles[vehicleIndex].coverages.splice(coverageIndex, 1);

    setFormData((prevData) => ({
      ...prevData,
      vehicles: updatedVehicles,
    }));
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = async () => {

    console.log(formData);

    const transformedData = JSON.parse(JSON.stringify(formData));

  // Convert strings to numbers for 'limit' and 'deductible'
  transformedData.vehicles.forEach((vehicle) => {
    vehicle.coverages.forEach((coverage) => {
      coverage.limit = Number(coverage.limit);
      coverage.deductible = Number(coverage.deductible);
    });
  });

    try {
      let response;

  if (mode === 'edit') {
    // For updating an existing policy
    response = await axios.put(`https://car4sure-green-leaf-3174.fly.dev/api/policies/${policy_id}`, formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } else {
    // For creating a new policy
    response = await axios.post('https://car4sure-green-leaf-3174.fly.dev/api/policies', formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

      if (response.status === 201) {
        console.log('Policy created successfully:', response.data);
        // You can reset the form here or redirect the user as needed
      }
    } catch (error) {
      console.error('Error creating policy:', error.response ? error.response.data : error.message);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <h2 className="text-2xl text-center font-semi">Policy Details</h2>
            <InputField label="Policy Number" id="policy_no" name="policy_no" value={formData.policy_no} onChange={handleInputChange} placeholder="Enter policy number" required />
            <InputField label="Policy Status" id="policy_status" name="policy_status" value={formData.policy_status} onChange={handleInputChange} placeholder="Enter policy status" required />
            <InputField label="Policy Type" id="policy_type" name="policy_type" value={formData.policy_type} onChange={handleInputChange} placeholder="Enter policy type" required />
            <InputField label="Policy Effective Date" id="policy_effective_date" name="policy_effective_date" type="date" value={formData.policy_effective_date} onChange={handleInputChange} required />
            <InputField label="Policy Expiration Date" id="policy_expiration_date" name="policy_expiration_date" type="date" value={formData.policy_expiration_date} onChange={handleInputChange} required />
          </div>
        );
      case 2:
        return (
          <div>
            <h2 className="text-2xl text-center font-semi">Policy Holder Information</h2>
            <InputField label="First Name" id="first_name" name="first_name" value={formData.policy_holder.first_name} onChange={(e) => handleNestedChange(e, ['policy_holder'])} placeholder="Enter first name" required />
            <InputField label="Last Name" id="last_name" name="last_name" value={formData.policy_holder.last_name} onChange={(e) => handleNestedChange(e, ['policy_holder'])} placeholder="Enter last name" required />
            <InputField label="Street" id="street" name="street" value={formData.policy_holder.address.street} onChange={(e) => handleNestedChange(e, ['policy_holder', 'address'])} placeholder="Enter street" required />
            <InputField label="City" id="city" name="city" value={formData.policy_holder.address.city} onChange={(e) => handleNestedChange(e, ['policy_holder', 'address'])} placeholder="Enter city" required />
            <InputField label="State" id="state" name="state" value={formData.policy_holder.address.state} onChange={(e) => handleNestedChange(e, ['policy_holder', 'address'])} placeholder="Enter state" required />
            <InputField label="Zip Code" id="zip" name="zip" value={formData.policy_holder.address.zip} onChange={(e) => handleNestedChange(e, ['policy_holder', 'address'])} placeholder="Enter zip code" required />
          </div>
        );
      case 3:
        return (
          <div>
            <h2 className="text-2xl text-center font-semi">Driver Details</h2>
            {formData.drivers.map((driver, index) => (
              <div key={index} className="border p-4 mb-4 rounded">
                <h3>Driver {index + 1}</h3>
                <InputField label="First Name" id="driver_first_name" name="first_name" value={driver.first_name} onChange={(e) => handleNestedChange(e, ['drivers', index])} placeholder="Enter first name" required />
                <InputField label="Last Name" id="driver_last_name" name="last_name" value={driver.last_name} onChange={(e) => handleNestedChange(e, ['drivers', index])} placeholder="Enter last name" required />
                <InputField label="Age" id="age" name="age" type="number" value={driver.age} onChange={(e) => handleNestedChange(e, ['drivers', index])} required />
                <InputField label="Gender" id="gender" name="gender" value={driver.gender} onChange={(e) => handleNestedChange(e, ['drivers', index])} required />
                <InputField label="Marital Status" id="marital_status" name="marital_status" value={driver.marital_status} onChange={(e) => handleNestedChange(e, ['drivers', index])} placeholder="Enter marital status" required />
                <InputField label="License Number" id="license_number" name="license_number" value={driver.license_number} onChange={(e) => handleNestedChange(e, ['drivers', index])} placeholder="Enter license number" required />
                <InputField label="License State" id="license_state" name="license_state" value={driver.license_state} onChange={(e) => handleNestedChange(e, ['drivers', index])} placeholder="Enter license state" required />
                <InputField label="License Status" id="license_status" name="license_status" value={driver.license_status} onChange={(e) => handleNestedChange(e, ['drivers', index])} placeholder="Enter license status" required />
                <InputField label="License Effective Date" id="license_effective_date" name="license_effective_date" type="date" value={driver.license_effective_date} onChange={(e) => handleNestedChange(e, ['drivers', index])} required />
                <InputField label="License Expiration Date" id="license_expiration_date" name="license_expiration_date" type="date" value={driver.license_expiration_date} onChange={(e) => handleNestedChange(e, ['drivers', index])} required />
                <InputField label="License Class" id="license_class" name="license_class" value={driver.license_class} onChange={(e) => handleNestedChange(e, ['drivers', index])} placeholder="Enter license class" required />

                <div className="w-1/4 text-center mt-8">
                  <SubmitButton
                    buttonText='Remove Driver'
                    onClick={() => removeDriver(index)}
                  />
                </div>
              </div>
            ))}
            <SubmitButton
              buttonText='Add Driver'
              onClick={addDriver}
            />
          </div>
        );
      case 4:
        return (
          <div>
            <h2 className="text-2xl text-center font-semi">Vehicle Details</h2>
            {formData.vehicles.map((vehicle, index) => (
              <div key={index} className="border p-4 mb-4 rounded">
                <h3>Vehicle {index + 1}</h3>
                <InputField label="Year" id="year" name="year" type="number" value={vehicle.year} onChange={(e) => handleNestedChange(e, ['vehicles', index])} placeholder="Enter year" required />
                <InputField label="Make" id="make" name="make" value={vehicle.make} onChange={(e) => handleNestedChange(e, ['vehicles', index])} placeholder="Enter make" required />
                <InputField label="Model" id="model" name="model" value={vehicle.model} onChange={(e) => handleNestedChange(e, ['vehicles', index])} placeholder="Enter model" required />
                <InputField label="VIN" id="vin" name="vin" value={vehicle.vin} onChange={(e) => handleNestedChange(e, ['vehicles', index])} placeholder="Enter VIN" required />
                <InputField label="Usage" id="usage" name="usage" value={vehicle.usage} onChange={(e) => handleNestedChange(e, ['vehicles', index])} placeholder="Enter usage" required />
                <InputField label="Primary Use" id="primary_use" name="primary_use" value={vehicle.primary_use} onChange={(e) => handleNestedChange(e, ['vehicles', index])} placeholder="Enter primary use" required />
                <InputField label="Annual Mileage" id="annual_mileage" name="annual_mileage" type="number" value={vehicle.annual_mileage} onChange={(e) => handleNestedChange(e, ['vehicles', index])} placeholder="Enter annual mileage" required />
                <InputField label="Ownership" id="ownership" name="ownership" value={vehicle.ownership} onChange={(e) => handleNestedChange(e, ['vehicles', index])} placeholder="Enter ownership" required />

                {/* Garaging Address */}
                <h4>Garaging Address</h4>
                <InputField
                  label="Street"
                  id="garaging_street"
                  name="street"
                  value={vehicle.garaging_address?.street || ''}
                  onChange={(e) => handleNestedChange(e, ['vehicles', index, 'garaging_address'])}
                  placeholder="Enter street"
                  required
                />
                <InputField
                  label="City"
                  id="garaging_city"
                  name="city"
                  value={vehicle.garaging_address?.city || ''}
                  onChange={(e) => handleNestedChange(e, ['vehicles', index, 'garaging_address'])}
                  placeholder="Enter city"
                  required
                />
                <InputField
                  label="State"
                  id="garaging_state"
                  name="state"
                  value={vehicle.garaging_address?.state || ''}
                  onChange={(e) => handleNestedChange(e, ['vehicles', index, 'garaging_address'])}
                  placeholder="Enter state"
                  required
                />
                <InputField
                  label="Zip"
                  id="garaging_zip"
                  name="zip"
                  value={vehicle.garaging_address?.zip || ''}
                  onChange={(e) => handleNestedChange(e, ['vehicles', index, 'garaging_address'])}
                  placeholder="Enter zip"
                  required
                />

                {/* Coverages Section */}
                <h4 className="mt-6 mb-6 text-center">Coverages for Vehicle {index + 1}</h4>
                {vehicle.coverages.map((coverage, coverageIndex) => (
                  <div key={coverageIndex} className="border p-2 mb-2 rounded">
                    <InputField label="Coverage Type" id="coverage_type" name="type" value={coverage.type} onChange={(e) => handleNestedChange(e, ['vehicles', index, 'coverages', coverageIndex])} placeholder="Enter coverage type" required />
                    <InputField label="Limit" id="limit" name="limit" type="number" value={coverage.limit} onChange={(e) => handleNestedChange(e, ['vehicles', index, 'coverages', coverageIndex])} placeholder="Enter limit" required />
                    <InputField label="Deductible" id="deductible" name="deductible" type="number" value={coverage.deductible} onChange={(e) => handleNestedChange(e, ['vehicles', index, 'coverages', coverageIndex])} placeholder="Enter deductible" required />

                    <div className="w-1/4 mt-8">
                      <SubmitButton
                        buttonText='Remove Coverage'
                        onClick={() => removeCoverage(index, coverageIndex)}
                      /></div>
                  </div>
                ))}
                <div className="w-1/4 ml-auto">
                  <SubmitButton
                    buttonText='Add Coverage'
                    onClick={() => addCoverage(index)}
                  /></div>
                {/* End of coverages */}
                <div className="w-1/4 text-center mt-8">
                  <SubmitButton
                    buttonText='Remove Vehicle'
                    onClick={() => removeVehicle(index)}
                  />
                </div>
              </div>
            ))}
            <SubmitButton
              buttonText='Add Vehicle'
              onClick={addVehicle}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-8 border rounded-lg shadow-lg bg-white">
      {renderStep()}
      <div className="mt-4 flex justify-between">
        {step > 1 && <button onClick={prevStep} className="px-4 py-2 bg-gray-300 text-black rounded">Previous</button>}
        {step < 4 ? (
          <button onClick={nextStep} className="px-4 py-2 bg-blue-500 text-white rounded">Next</button>
        ) : (
          // <button onClick={handleSubmit} className="px-4 py-2 bg-green-500 text-white rounded">Submit</button>
          <SubmitButton
            buttonText='Submit'
            onClick={handleSubmit}
          />
        )}
      </div>
    </div>
  );
};

export default CreateClaim;