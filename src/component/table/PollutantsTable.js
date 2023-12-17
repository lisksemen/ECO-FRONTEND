import React from 'react';
import './Table.css'
import Table from "./Table";
import PollutantUpdateForm from "../pollutant/PollutantUpdateForm";
import PollutantDeleteButton from "../pollutant/PollutantDeleteButton";

function PollutantsTable({ pollutants, onPollutantUpdate, onPollutantDelete }) {
    return (
        <Table>
            <thead className="">
            <tr>
                <th rowSpan="2">ID</th>
                <th rowSpan="2">Назва забруднюючої речовини</th>
                <th rowSpan="2">Величина масової витрати г/год.</th>
                <th rowSpan="2">Гранично допустима концинтрація мг/м3</th>
                <th rowSpan="2">Гранично допустимі викиди мг/м3</th>
                <th rowSpan="2">Фактор канцерогенного потенціалу (мг/(кг * доба)</th>
                <th rowSpan="2">Референтна концентрація, мг/м3</th>
                <th rowSpan="2">Тип забруднюючої речовини</th>
                <th rowSpan="2">Податок</th>
                <th rowSpan="2">Оновлення даних</th>
                <th rowSpan="2">Видалення</th>
            </tr>
            </thead>
            <tbody>
            {pollutants.map((pollutant) => (
                <tr key={pollutant.id}>
                    <td>{pollutant.id}</td>
                    <td>{pollutant.name}</td>
                    <td>{pollutant.mfr}</td>
                    <td>{pollutant.tlv}</td>
                    <td>{pollutant.elv}</td>
                    <td>{pollutant.sf}</td>
                    <td>{pollutant.rfc}</td>
                    <td>{pollutant.pollutantType.pollutantTypeName}</td>
                    <td>{pollutant.taxRate}</td>
                    <td><PollutantUpdateForm pollutant={pollutant} onUpdate={onPollutantUpdate}/></td>
                    <td><PollutantDeleteButton pollutant={pollutant} onDelete={onPollutantDelete}/></td>
                </tr>
            ))}
            </tbody>
        </Table>
    );
}

export default PollutantsTable;