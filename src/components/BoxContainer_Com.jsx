import React, { Component } from 'react';
import '../styles/components/BoxContainer_Styles.css';
import ToDoItemCom from './ToDoItem_Com';

export default class BoxContainer_Com extends Component {
    render() {
        return (
            <div className='box-container'>
                <h2 className='box-title'>{this.props.title}</h2>
                { this.props.data && this.props.data.map((res, idx) => {
                    return (
                        this.props.type.includes('to-do-list') ?
                            <ToDoItemCom
                                key={`item_${idx}`}
                                type={this.props.type}
                                data={res}
                            />
                        :
                            <></>
                    );
                })}
            </div>
        )
    }
}
