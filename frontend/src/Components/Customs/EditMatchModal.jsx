import { useState } from "react";


function EditMatchModal({ match, onClose, onSave }) {
  const [formData, setFormData] = useState(match);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content match-form p-6">
        <h2 className="text-xl font-semibold mb-4 text-white">Edit Match</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Form fields similar to the add match form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-300 mb-2">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full bg-gray-800 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-600"
                aria-label="Select the date"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-2">Round</label>
              <select
                name="round"
                value={formData.round}
                onChange={handleChange}
                className="w-full bg-gray-800 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-600"
                aria-label="Select the round"
                required
              >
                <option value="Group Stage">Group Stage</option>
                <option value="Quarter Final">Quarter Final</option>
                <option value="Semi Final">Semi Final</option>
                <option value="Final">Final</option>
              </select>
            </div>
          </div>
          {/* Add other form fields similarly */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-300 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded-lg"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditMatchModal;