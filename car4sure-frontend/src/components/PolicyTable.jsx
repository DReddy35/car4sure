import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SubmitButton from './SubmitButton'; // Assuming you have a reusable button component
import CreateClaim from './CreateClaim';


const PolicyTable = () => {
    const [policies, setPolicies] = useState([]);
    const [editingPolicy, setEditingPolicy] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPolicy, setSelectedPolicy] = useState(null);



    useEffect(() => {
        const fetchPolicies = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/policies');
                setPolicies(response.data);
            } catch (error) {
                console.error("Error fetching policies", error);
            }
        };
        fetchPolicies();
    }, []);

    const handleDownloadPDF = async (policyId) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/policies/${policyId}/pdf`, {
                responseType: 'blob',
            });
    
            // Create a link element, set its URL, and click it to download the PDF
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            // window.open(url, '_blank');
            link.setAttribute('download', `policy_${policyId}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        } catch (error) {
            console.error('Error downloading PDF:', error);
        }
    };



    const handleEdit = (policy) => {
        setSelectedPolicy(policy);
        console.log(selectedPolicy);
        setIsModalOpen(true);
    };

    const handleDelete = async (policyId) => {
        if (confirm("Are you sure you want to delete this policy?")) {
            try {
                await axios.delete(`http://127.0.0.1:8000/api/policies/${policyId}`);
                setPolicies(policies.filter(policy => policy.id !== policyId));
            } catch (error) {
                console.error("Error deleting policy", error);
            }
        }
    };

    return (
        <div className="mx-auto w-full px-4 py-6 bg-gray-300">
            <h2 className="text-2xl font-bold mb-4 text-center">Policies</h2>
            <table className="min-w-full bg-white mx-auto">
                <thead className="bg-gray-800 text-white">
                    <tr>
                        <th className="w-1/6 py-2">Policy No</th>
                        <th className="w-1/6 py-2">Type</th>
                        <th className="w-1/6 py-2">Status</th>
                        <th className="w-1/6 py-2">Effective Date</th>
                        <th className="w-1/6 py-2">Expiration Date</th>
                        <th className="w-1/6 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {policies.map((policy) => (
                        <tr key={policy.id} className="text-center">
                            <td className="border px-4 py-2">{policy.policy_no}</td>
                            <td className="border px-4 py-2">{policy.policy_type}</td>
                            <td className="border px-4 py-2">{policy.policy_status}</td>
                            <td className="border px-4 py-2">{policy.policy_effective_date}</td>
                            <td className="border px-4 py-2">{policy.policy_expiration_date}</td>
                            <td className="border px-4 py-2 flex justify-center gap-2">
                                <SubmitButton buttonText="Edit" onClick={() => handleEdit(policy)} />
                                <SubmitButton buttonText="Delete" onClick={() => handleDelete(policy.id)} />
                                {/* Placeholder for PDF download */}
                                <SubmitButton onClick={() => handleDownloadPDF(policy.id)} buttonText="Download PDF" />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal */}
            {isModalOpen && (
                <div className="modal-background">
                    <div className="modal-content">
                        <CreateClaim
                            selectedPolicy={selectedPolicy}
                            closeModal={() => {
                                setIsModalOpen(false);
                                setSelectedPolicy(null);
                            }}
                            policy_id={selectedPolicy.id}
                            mode="edit"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default PolicyTable;