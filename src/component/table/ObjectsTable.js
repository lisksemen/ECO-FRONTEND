import React from 'react';
import './Table.css'
import Table from "./Table";
import ObjectUpdateForm from "../object/ObjectUpdateForm";
import ObjectDeleteButton from "../object/ObjectDeleteButton";

function ObjectsTable({ objects, onObjectUpdate, onObjectDelete }) {
    return (
        <Table>
            <thead className="">
            <tr>
                <th rowSpan="2">ID</th>
                <th rowSpan="2">Назва підприємства</th>
                <th rowSpan="2">Опис</th>
                <th rowSpan="2">Оновлення даних</th>
                <th rowSpan="2">Видалення</th>
            </tr>
            </thead>
            <tbody>
            {objects.map((object) => (
                <tr key={object.id}>
                    <td>{object.id}</td>
                    <td>{object.name}</td>
                    <td>{object.description}</td>
                    <td><ObjectUpdateForm object={object} onUpdate={onObjectUpdate}/></td>
                    <td><ObjectDeleteButton object={object} onDelete={onObjectDelete}/></td>
                </tr>
            ))}
            </tbody>
        </Table>
    );
}

export default ObjectsTable;