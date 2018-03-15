import React, { Component } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

import styles from './PropertyForm.css'

const Input = (props) => {
  return <input {...props} />
}

const PropertyType = ({ propertyType, onClick }) => (
  <div className={styles.propertyType} >
    <Input type="radio" name="propertyType" id={propertyType} value={propertyType} />
    <label htmlFor={propertyType} >
      <FormattedMessage id={'form.propertyType.' + propertyType} />
    </label>
  </div >
)

const RoomsInputs = ({ propertyType }) => {
  if (!propertyType || propertyType !== 'studio') {
    return (
      <div>
        <p><FormattedMessage id="form.nbRoom.label" /> :</p>
        <Input type="number" name="nbRoom" />
        <p><FormattedMessage id="form.nbBedroom.label" /> :</p>
        <Input type="number" name="nbBedroom" />
      </div>
    )
  }

  return null
}

class PropertyForm extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.update = this.update.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  update(e) {
    const form = e.currentTarget
    this.setState({
      area: form.area.value,
      availableDate: form.availableDate.value,
      nbRoom: form.nbRoom ? form.nbRoom.value : '',
      nbBedroom: form.nbBedroom ? form.nbBedroom.value : '',
      propertyType: form.propertyType.value,
    })
  }

  render() {
    return (
      <form id={styles.ownerForm} onChange={form => this.update(form)} onSubmit={this.handleSubmit} >

        <p><FormattedMessage id="form.propertyType.label" /> :</p>
        {this.props.propertyType.map(type => (<PropertyType key={type._id} propertyType={type.name} />))}

        <RoomsInputs propertyType={this.state.propertyType} />

        <p><FormattedMessage id="form.area.label" /> :</p>
        <Input type="number" name="area" />

        <p><FormattedMessage id="form.availableDate.label" /> :</p>
        <Input type="date" name="availableDate" />

        <br />
        <br />

        <Input type="submit" name="submit" value={this.props.intl.messages['form.submit']} />
      </form>
    )
  }
}

export default injectIntl(PropertyForm)