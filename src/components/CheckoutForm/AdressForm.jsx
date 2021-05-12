import React, { useState, useEffect } from 'react'
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core'
import { useForm, FormProvider } from 'react-hook-form'
import { Link } from 'react-router-dom'
import FormInput from './CustomTextField'

import { commerce } from '../../lib/commerce'

const AdressForm = ({ checkoutToken, next }) => {
    const [ shippingCountries, setShippingCountries ] = useState([])
    const [ shippingCountry, setShippingCountry ] = useState('')
    const [ shippingSubDivisions, setShippingSubDivisions ] = useState([])
    const [ shippingSubDivision, setShippingSubDivision ] = useState('')
    const [ shippingOptions, setShippingOptions ] = useState([])
    const [ shippingOption, setShippingOption ] = useState('')

    const methods = useForm()
    const countries = Object.entries(shippingCountries).map(([code, name]) => ({id: code, label: name}))
    const subdivisions = Object.entries(shippingSubDivisions).map(([code, name]) => ({id: code, label: name}))
    const options = shippingOptions.map((sOpt) => ({id: sOpt.id, label: `${sOpt.description} - (${sOpt.price.formatted_with_symbol})`}))

    const fetchShippingCountries = async (checkoutTokenId) => {
        const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId)
        setShippingCountries(countries)
        setShippingCountry(Object.keys(countries)[0])
    };

    const fetchSubdivisions = async (countryCode) => {
        const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode)
        setShippingSubDivisions(subdivisions)
        setShippingSubDivision(Object.keys(subdivisions)[0])
    };

    const fetchShippingOptions = async ( checkoutTokenId, country, region = null) => {
         const options = await commerce.checkout.getShippingOptions(checkoutTokenId, { country, region })
        console.log(options)
        setShippingOptions(options)
        setShippingOption(options[0].id)
    };

    useEffect(() => {
        fetchShippingCountries(checkoutToken.id)
    }, [])

    useEffect(() => {
       if (shippingCountry) fetchSubdivisions(shippingCountry)
    }, [shippingCountry])

    useEffect(() => {
      if (shippingSubDivision) fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubDivision)
    }, [shippingSubDivision])

    return (
        <>
            <Typography variant='h6' gutterBottom>Shipping Adress</Typography>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit((data) => next( {...data, shippingCountry, shippingSubDivision, shippingOption}))}>
                    <Grid container spacing={3}>
                    <FormInput name='firstName' label='First Name' required />
                    <FormInput name='lastName' label='Last Name' required />
                    <FormInput name='adress1' label='Adress' required />
                    <FormInput name='email' label='Email' required />
                    <FormInput name='City' label='City' required />
                    <FormInput name='Zip' label='ZIP / Postal Code' required />
                   <Grid item xs={12} sm={6}>
                        <InputLabel>Shipping Country</InputLabel>
                        <Select value={shippingCountry} fullWidth onChange={(e) => setShippingCountry(e.target.value)}>
                            { countries.map((country) => (
                               <MenuItem key={country.id} value={country.id}>
                                  {country.label}
                               </MenuItem>
                            ))}
                        </Select>
                    </Grid>
                     <Grid item xs={12} sm={6}>
                        <InputLabel>Shipping SubDivision</InputLabel>
                        <Select value={shippingSubDivision} fullWidth onChange={(e) => setShippingSubDivision(e.target.value)}>
                            { subdivisions.map((subdivision) => (
                               <MenuItem key={subdivision.id} value={subdivision.id}>
                                  {subdivision.label}
                               </MenuItem>
                            ))}
                        </Select>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <InputLabel>Shipping Options</InputLabel>
                        <Select value={shippingOption} fullWidth onChange={(e) => setShippingOption(e.target.value)}>
                            { options.map((option) => (
                               <MenuItem key={option.id} value={option.id}>
                                  {option.label}
                               </MenuItem>
                            ))}
                        </Select>
                    </Grid>
                 </Grid>
                </form>
                <br />
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button component={Link} to='/cart' variant='outlined'>Back to Cart</Button>
                    <Button type='submit' variant='contained' color='primary'>Next</Button>
                </div>

            </FormProvider>
        </>
    )
}

export default AdressForm
