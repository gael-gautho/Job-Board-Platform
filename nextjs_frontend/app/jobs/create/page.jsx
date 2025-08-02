export default function NewJobPage() {
	return (
		<div className="py-10 px-6">
        <h1 className="mb-6 text-2xl">Create job</h1>

        <form className="space-y-4">
            <div>
                <label>Category</label>

                <select className="w-full mt-2 p-4 rounded-xl bg-gray-100">
                    <option value="">Select category</option>
                    <option>
                    </option>
                </select>
            </div>

            <div>
                <label>Title</label>
                <input type="text" className="w-full mt-2 p-4 rounded-xl bg-gray-100"/>
            </div>

            <div>
                <label>Description</label>
                <textarea className="w-full mt-2 p-4 rounded-xl bg-gray-100"></textarea>
            </div>

            <div>
                <label>Salary</label>
                <input type="text" className="w-full mt-2 p-4 rounded-xl bg-gray-100"/>
            </div>

            <div>
                <label>Location</label>
                <input type="text" className="w-full mt-2 p-4 rounded-xl bg-gray-100"/>
            </div>

            <div>
                <label>Company name</label>
                <input type="text" className="w-full mt-2 p-4 rounded-xl bg-gray-100"/>
            </div>

            <div>
                <label>Company location</label>
                <input type="text" className="w-full mt-2 p-4 rounded-xl bg-gray-100"/>
            </div>

            <div>
                <label>Company e-mail</label>
                <input type="text" className="w-full mt-2 p-4 rounded-xl bg-gray-100"/>
            </div>

            <button className="py-4 px-6 bg-blue-600 text-white rounded-xl">Submit</button>
        </form>
    </div>
	);
}
