import React from 'react'
class PropertyInfo extends React.Component {
    state={
        currentProperty:''
    }
    handlePropertyChange=(e)=>{
        this.setState({...this.state,currentProperty:e.target.value})
        this.props.handlePropertyChange(e.target.value)
    }
    render() {
    return(<>
    <select onChange={this.handlePropertyChange} value={this.state.currentProperty}
            style={{"padding":'7px 74px 4px 7px',"borderBottomLeftRadius":'17px'}}>
                <option>select</option>
            { this.props.propertylist && this.props.propertylist.map( property =>
            <option key={property.propertyInfoId} value={
                (property.propertyInfoId)?
                property.propertyInfoId:property.id
            }
            >
            {(property.properties&&property.properties.name)?
                property.properties.name:property.name}

            </option> 
    )} 
    </select>
    </>)
    }
}
export default PropertyInfo