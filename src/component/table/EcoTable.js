import React, {useState} from 'react';
import './Table.css'
import Table from "./Table";
import PollutionUpdateForm from "../pollution/PollutionUpdateForm";
import PollutionDeleteButton from "../pollution/PollutionDeleteButton";
import 'react-tooltip/dist/react-tooltip.css';
import FilterForm from './FilterForm';
import {Tooltip} from "react-tooltip";

function EcoTable({ pollutions, onPollutionUpdate, onPollutionDelete }) {

    const [filters, setFilters] = useState({
        idFilter: '',
        companyNameFilter: '',
        pollutantNameFilter: '',
        periodFilter: '',
    });

    const [isFilterFormVisible, setIsFilterFormVisible] = useState(false);

    const handleFilterChange = (name, value) => {
        setFilters({ ...filters, [name]: value });
    };

    const toggleFilterForm = () => {
        setIsFilterFormVisible(!isFilterFormVisible);
    };

    const filteredPollutions = pollutions.filter((pollution) => {
        const idMatches = pollution.id.toString().includes(filters.idFilter);
        const companyNameMatches = pollution.objectName.includes(filters.companyNameFilter);
        const pollutantNameMatches = pollution.pollutant.name.includes(filters.pollutantNameFilter);
        const periodMatches = pollution.year.toString().includes(filters.periodFilter);
        return idMatches && companyNameMatches && pollutantNameMatches && periodMatches;
    });

    const [hqMessage, setHqMessage] = useState(null);
    const [crMessage, setCrMessage] = useState(null);

    const hqMouseOver = (hq) => {
        if (hq < 1) {
            setHqMessage("Ризик виникнення шкідливих ефектів розглядають як зневажливо малий");
        } else if (hq === 1) {
            setHqMessage("Гранична величина, що не потребує термінових заходів, " +
                "однак не може розглядатися як досить прийнятна");
        } else {
            setHqMessage("Імовірність розвитку шкідливих ефектів зростає пропорційно збільшенню HQ");
        }
    }

    const crMouseOver = (cr) => {
        if (cr > 1e-3) {
            setCrMessage("Високий (De Manifestis) - не прийнятний для виробничих умов і населення. " +
                "Необхідне здійснення заходів з усунення або зниження ризику");
        } else if (cr <= 1e-3 && cr > 1e-4) {
            setCrMessage("Середній - припустимий для виробничих умов; " +
                "за впливу на все населення необхідний динамічний контроль і поглиблене вивчення джерел " +
                "і можливих наслідків шкідливих впливів для вирішення питання про заходи з управління ризиком");
        } else if (cr <= 1e-4 && cr > 1e-6) {
            setCrMessage("Низький - припустимий ризик (рівень, на якому, як правило, " +
                "встановлюються гігієнічні нормативи для населення)");
        } else {
            setCrMessage("Мінімальний (De Minimis) - " +
                "бажана (цільова) величина ризику при проведенні оздоровчих і природоохоронних заходів");
        }
    }

    return (
        <div className="bg-dark text-center">
            <Table>
                <thead className="">
                <tr>
                    <th rowSpan="2">ID</th>
                    <th rowSpan="2">Назва підприємства</th>
                    <th rowSpan="2">Назва забруднюючої речовини</th>
                    <th rowSpan="2">Тип забруднюючої речовини</th>
                    <th rowSpan="2">Усього викидів підприємства г/год.</th>
                    <th colSpan="3">Нормативи забруднюючих речовин</th>
                    <th rowSpan="2">Концентрація викидів мг/м3</th>
                    <th rowSpan="2">Неканцерогенний коефіцієнт небезпеки</th>
                    <th rowSpan="2">Індивідуальний канцерогенний ризик</th>
                    <th rowSpan="2">Розмір відшкодування збитків</th>
                    <th rowSpan="2">Рік</th>
                    <th rowSpan="2">Податок</th>
                    <th rowSpan="2">Оновлення даних</th>
                    <th rowSpan="2">Видалення</th>
                </tr>
                <tr>
                    <th>Величина масової витрати г/год.</th>
                    <th>Гранично допустимі викиди мг/м3</th>
                    <th>Гранично допустимі концентрація мг/м3</th>
                </tr>
                </thead>
                <tbody>
                {filteredPollutions.map((pollution) => (
                <tr key={pollution.id}>
                    <td>{pollution.id}</td>
                    <td>{pollution.objectName}</td>
                    <td>{pollution.pollutant.name}</td>
                    <td>{pollution.pollutant.pollutantType.pollutantTypeName}</td>
                    <td>{pollution.valuePollution ? pollution.valuePollution.toPrecision(2) : 'N/A'}</td>
                    <td>{pollution.pollutantMfr}</td>
                    <td>{pollution.pollutantElv}</td>
                    <td>{pollution.pollutantTlv}</td>
                    <td>{pollution.pollutionConcentration}</td>

                    <td onMouseOver={() => hqMouseOver(pollution.hq)}
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content={hqMessage}
                        data-tooltip-place="top">
                        {pollution.hq ? pollution.hq.toPrecision(2) : 0}
                    </td>

                    <td onMouseOver={() => crMouseOver(pollution.cr)}
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content={crMessage}
                        data-tooltip-place="top">
                        {pollution.cr ? pollution.cr.toPrecision(2) : 0}
                    </td>
                    <td>{pollution.fee ? pollution.fee.toPrecision(2) : 'N/A'}</td>
                    <td>{pollution.year}</td>
                    <td>{pollution.tax ? pollution.tax.toPrecision(2) : 'N/A'}</td>
                    <td><PollutionUpdateForm pollution={pollution} onUpdate={onPollutionUpdate}/></td>
                    <td><PollutionDeleteButton pollution={pollution} onDelete={onPollutionDelete}/></td>
                </tr>
                ))}
                </tbody>
            </Table>
            <Tooltip
                id="my-tooltip"
                style={{ width: "400px" }
                }/>
            <button
                className="btn btn-info mb-3"
                onClick={toggleFilterForm}
            >
                {isFilterFormVisible ? 'Hide Filters' : 'Show Filters'}
            </button>
            {isFilterFormVisible && <FilterForm filters={filters} onFilterChange={handleFilterChange} />}

        </div>
    );
}

export default EcoTable;