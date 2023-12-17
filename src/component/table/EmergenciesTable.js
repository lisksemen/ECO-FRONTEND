import React from 'react';
import './Table.css'
import Table from "./Table";
import EmergencyUpdateForm from "../emergency/EmergencyUpdateForm";
import EmergencyDeleteButton from "../emergency/EmergencyDeleteButton";

function EmergenciesTable({ emergencies, onEmergencyUpdate, onEmergencyDelete }) {
    return (
        <Table>
            <thead className="">
            <tr>
                <th rowSpan="2">ID</th>
                <th rowSpan="2">Загиблих</th>
                <th rowSpan="2">У тяжкому стані</th>
                <th rowSpan="2">Фатальні травми</th> {/* */}
                <th rowSpan="2">Легкі травми</th>
                <th rowSpan="2">Підприємство</th>
                <th rowSpan="2">Забруднювач</th>
                <th rowSpan="2">Маса викидів (т.)</th> {/* */}
                <th rowSpan="2">Концентрація (мг/м³)</th> {/* */}
                <th rowSpan="2">Компенсація робітникам (грн.)</th>
                <th rowSpan="2">Збитки від забруднення (грн.)</th> {/* */}
                <th rowSpan="2">Оновлення даних</th>
                <th rowSpan="2">Видалення</th>
            </tr>
            </thead>
            <tbody>
            {emergencies.map((emergency) => (
                <tr key={emergency.id}>
                    <td>{emergency.id}</td>
                    <td>{emergency.peopleCountDead}</td>
                    <td>{emergency.peopleCountStrongInjury}</td>
                    <td>{emergency.peopleCountFatalInjury}</td>
                    <td>{emergency.peopleCountLightInjury}</td>
                    <td>{emergency.object.name}</td>
                    <td>{emergency.pollutant.name}</td>
                    <td>{emergency.mass}</td>
                    <td>{emergency.concentration ? emergency.concentration.toPrecision(2) : 'N/A'}</td>
                    <td>{emergency.peopleLoss ? emergency.peopleLoss.toPrecision(2) : 'N/A'}</td>
                    <td>{emergency.emergencyLoss ? emergency.emergencyLoss.toPrecision(2) : 'N/A'}</td>
                    <td><EmergencyUpdateForm emergency={emergency} onUpdate={onEmergencyUpdate}/></td>
                    <td><EmergencyDeleteButton emergency={emergency} onDelete={onEmergencyDelete}/></td>
                </tr>
            ))}
            </tbody>
        </Table>
    );
}

export default EmergenciesTable;