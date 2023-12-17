import React from 'react';

function FilterForm({ filters, onFilterChange }) {
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        onFilterChange(name, value);
    };

    return (
        <div className="filter-form">
            <div className="form-row">
                <div className="col">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Filter by ID"
                        name="idFilter"
                        value={filters.idFilter}
                        onChange={handleFilterChange}
                    />
                </div>
                <div className="col">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Filter by Назва підприємства"
                        name="companyNameFilter"
                        value={filters.companyNameFilter}
                        onChange={handleFilterChange}
                    />
                </div>
                <div className="col">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Filter by Назва забруднюючої речовини"
                        name="pollutantNameFilter"
                        value={filters.pollutantNameFilter}
                        onChange={handleFilterChange}
                    />
                </div>
                <div className="col">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Filter by період"
                        name="periodFilter"
                        value={filters.periodFilter}
                        onChange={handleFilterChange}
                    />
                </div>
            </div>
        </div>
    );
}

export default FilterForm;
