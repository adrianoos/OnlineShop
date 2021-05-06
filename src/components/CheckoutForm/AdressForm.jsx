import React, { useState, useEffect } from 'react'
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core'
import { useForm, FormProvider } from 'react-hook-form'
import FormInput from './CustomTextField'

import { commerce } from '../../lib/commerce'

const AdressForm = ({ checkoutToken }) => {
    const [ shippingCountries, setShippingCountries ] = useState([])
    const [ shippingCountry, setShippingCountry ] = useState('')
    const [ shippingSubDivisions, setShippingSubDivisions ] = useState([])
    const [ shippingSubDivision, setShippingSubDivision ] = useState('')
    const [ shippingOptions, setShippingOptions ] = useState([])
    const [ shippingOption, setShippingOption ] = useState('')
    const methods = useForm()
    const countries = Object.entries(shippingCountries).map(([code, name]) => ({id: code, label: name}))

    const fetchShippingCountries = async (checkoutTokenId) => {
        const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId)
        console.log(countries)
        setShippingCountries(countries)
        setShippingCountry(Object.keys(countries)[0])
    };

    useEffect(() => {
        fetchShippingCountries(checkoutToken.id)
    }, [])
    return (
        <>
            <Typography variant='h6' gutterBottom>Shipping Adress</Typography>
            <FormProvider {...methods}>
                <form onSubmit=''>
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
                  {/*   <Grid item xs={12} sm={6}>
                        <InputLabel>Shipping SubDivision</InputLabel>
                        <Select value={} fullWidth onChange={}>
                            <MenuItem key={} value={}>
                                Select ME
                            </MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <InputLabel>Shipping Options</InputLabel>
                        <Select value={} fullWidth onChange={}>
                            <MenuItem key={} value={}>
                                Select ME
                            </MenuItem>
                        </Select>
    </Grid> */}
                    </Grid>
                </form>

            </FormProvider>
        </>
    )
}

export default AdressForm
