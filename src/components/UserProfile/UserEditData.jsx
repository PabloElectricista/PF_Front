import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import { putUser, getAllUsers } from '../../redux/actions'

const UserEditData = () => {
  const paises = [
    'Afganistán',
    'Albania',
    'Alemania',
    'Andorra',
    'Angola',
    'Antigua y Barbuda',
    'Arabia Saudita',
    'Argelia',
    'Argentina',
    'Armenia',
    'Australia',
    'Austria',
    'Azerbaiyán',
    'Bahamas',
    'Bangladés',
    'Barbados',
    'Baréin',
    'Bélgica',
    'Belice',
    'Benín',
    'Bielorrusia',
    'Birmania',
    'Bolivia',
    'Bosnia y Herzegovina',
    'Botsuana',
    'Brasil',
    'Brunéi',
    'Bulgaria',
    'Burkina Faso',
    'Burundi',
    'Bután',
    'Cabo Verde',
    'Camboya',
    'Camerún',
    'Canadá',
    'Catar',
    'Chad',
    'Chile',
    'China',
    'Chipre',
    'Ciudad del Vaticano',
    'Colombia',
    'Comoras',
    'Corea del Norte',
    'Corea del Sur',
    'Costa de Marfil',
    'Costa Rica',
    'Croacia',
    'Cuba',
    'Dinamarca',
    'Dominica',
    'Ecuador',
    'Egipto',
    'El Salvador',
    'Emiratos Árabes Unidos',
    'Eritrea',
    'Eslovaquia',
    'Eslovenia',
    'España',
    'Estados Unidos',
    'Estonia',
    'Etiopía',
    'Filipinas',
    'Finlandia',
    'Fiyi',
    'Francia',
    'Gabón',
    'Gambia',
    'Georgia',
    'Ghana',
    'Granada',
    'Grecia',
    'Guatemala',
    'Guyana',
    'Guinea',
    'Guinea ecuatorial',
    'Guinea-Bisáu',
    'Haití',
    'Honduras',
    'Hungría',
    'India',
    'Indonesia',
    'Irak',
    'Irán',
    'Irlanda',
    'Islandia',
    'Islas Marshall',
    'Islas Salomón',
    'Israel',
    'Italia',
    'Jamaica',
    'Japón',
    'Jordania',
    'Kazajistán',
    'Kenia',
    'Kirguistán',
    'Kiribati',
    'Kuwait',
    'Laos',
    'Lesoto',
    'Letonia',
    'Líbano',
    'Liberia',
    'Libia',
    'Liechtenstein',
    'Lituania',
    'Luxemburgo',
    'Madagascar',
    'Malasia',
    'Malaui',
    'Maldivas',
    'Malí',
    'Malta',
    'Marruecos',
    'Mauricio',
    'Mauritania',
    'México',
    'Micronesia',
    'Moldavia',
    'Mónaco',
    'Mongolia',
    'Montenegro',
    'Mozambique',
    'Namibia',
    'Nauru',
    'Nepal',
    'Nicaragua',
    'Níger',
    'Nigeria',
    'Noruega',
    'Nueva Zelanda',
    'Omán',
    'Países Bajos',
    'Pakistán',
    'Palaos',
    'Palestina',
    'Panamá',
    'Papúa Nueva Guinea',
    'Paraguay',
    'Perú',
    'Polonia',
    'Portugal',
    'Reino Unido',
    'República Centroafricana',
    'República Checa',
    'República de Macedonia',
    'República del Congo',
    'República Democrática del Congo',
    'República Dominicana',
    'República Sudafricana',
    'Ruanda',
    'Rumanía',
    'Rusia',
    'Samoa',
    'San Cristóbal y Nieves',
    'San Marino',
    'San Vicente y las Granadinas',
    'Santa Lucía',
    'Santo Tomé y Príncipe',
    'Senegal',
    'Serbia',
    'Seychelles',
    'Sierra Leona',
    'Singapur',
    'Siria',
    'Somalia',
    'Sri Lanka',
    'Suazilandia',
    'Sudán',
    'Sudán del Sur',
    'Suecia',
    'Suiza',
    'Surinam',
    'Tailandia',
    'Tanzania',
    'Tayikistán',
    'Timor Oriental',
    'Togo',
    'Tonga',
    'Trinidad y Tobago',
    'Túnez',
    'Turkmenistán',
    'Turquía',
    'Tuvalu',
    'Ucrania',
    'Uganda',
    'Uruguay',
    'Uzbekistán',
    'Vanuatu',
    'Venezuela',
    'Vietnam',
    'Yemen',
    'Yibuti',
    'Zambia',
    'Zimbabue',
  ]
  const allUsers = useSelector((state) => state.users)
  const userId = allUsers.filter((u) => u._id === allUsers._id)
  const dispatch = useDispatch()
  // const navigate = useNavigate()
  const [errors, setErrors] = useState({})
  const [input, setInput] = useState({
    name: '',
    lastname: '',
    country: '',
    cuil: '',
    phone: '',
    address: '',
    postal: '',
  })

  useEffect(() => {
    setInput({
      ...input,
      name: userId[0].name,
      lastname: userId[0].lastname,
      country: userId[0].country,
      cuil: userId[0].cuil,
      phone: userId[0].phone,
      address: userId[0].address,
      postal: userId[0].postal,
    })
  })

  useEffect(() => {
    setErrors(validate(input))
  }, [input])

  const validate = (input) => {
    const errors = {}

    if (input.name && !input.name.match(/^[a-zA-Z ]*$/g)) {
      errors.name = 'only letters*'
    }
    if (input.lastname && !input.lastname.match(/^[a-zA-Z ]*$/g)) {
      errors.lastname = 'only letters*'
    }
    if (input.cuil && !input.cuil.match(/^[\d]{1,3}\.?[\d]{3,3}\.?[\d]{3,3}$/)) {
      errors.cuil = 'Must be a valid ID number*'
    }
    if (
      input.phone &&
      !input.phone.match(/^\(?\d{2}\)?[\s\.-]?\d{4}[\s\.-]?\d{4}$/)
    ) {
      errors.phone = 'Must be a valid phone number*'
    }
    if (!input.address.match(/^[A-Za-z0-9\s]+$/g) && input.address) {
      errors.address = 'Symbols are not allowed*'
    }
      if (input.postal && !input.postal.match(/^(\d{4})$/g)) {
      errors.postal ='Must be a valid ZIP Code*'
    }

    return errors
  }

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    })
    console.log('input:', input)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (Object.values(errors).length > 0) {
      return alert(Object.values(errors))
    } else {
      const id = allUsers._id
      dispatch(putUser(id, input))
      alert('Personal data updated', 'updateInfo')
      setTimeout(function () {
        dispatch(getAllUsers())
      }, 500)
    }
  }

  return (
    <div>
      <form  onSubmit={(e) => handleSubmit(e)}>
        <legend>Personal Data</legend>
        {/* <img src={userId[0].picture} alt='' /> */}
        <div >
          <div >
            <label htmlFor='username'>User:</label>
            <input
              type='text'
              name='username'
              value={userId[0].username}
              readOnly
            />
          </div>

          <div>
            <label htmlFor='email'>Email:</label>
            <input type='text' name='email' value={userId[0].email} readOnly />
          </div>

          <div>
            <label htmlFor='name'>Name:</label>
            <input
              type='text'
              name='name'
              onChange={(e) => handleChange(e)}
              value={input.name}
            />
            {errors?.name ? (
              <p >{errors.name}</p>
            ) : null}
          </div>

          <div>
            <label htmlFor='lastname'>Lastname:</label>
            <input
              type='text'
              name='lastname'
              onChange={(e) => handleChange(e)}
              value={input.lastname}
            />
            {errors?.lastname ? (
              <p >{errors.lastname}</p>
            ) : null}
          </div>

          <div>
            <label htmlFor='country'>Country:</label>
            <select
              name='country'
              onChange={(e) => handleChange(e)}
            >
              <option value=''>Select</option>
              {paises.map((e) => {
                return (
                  <option key={e} value={e}>
                    {e}
                  </option>
                )
              })}
            </select>
          </div>

          <div>
            <label htmlFor='cuil'>Identification Number:</label>
            <input
              type='text'
              name='cuil'
              onChange={(e) => handleChange(e)}
              value={input.cuil}
            />
            {errors.cuil && input.cuil ? (
              <p >{errors.cuil}</p>
            ) : null}
          </div>

          <div>
            <label htmlFor='phone'>Phone:</label>
            <input
              type='text'
              name='phone'
              onChange={(e) => handleChange(e)}
              value={input.phone}
            />
            {errors.phone && input.phone ? (
              <p >{errors.phone}</p>
            ) : null}
          </div>

          <div>
            <label htmlFor='address'>Address:</label>
            <input
              type='text'
              name='address'
              onChange={(e) => handleChange(e)}
              value={input.address}
            />
            {errors?.address ? (
              <p >{errors.address}</p>
            ) : null}
          </div>

          <div>
            <label htmlFor='postal'>ZIP Code:</label>
            <input
              type='number'
              name='postal'
              onChange={(e) => handleChange(e)}
              value={input.postal}
            />
            {errors?.postal ? (
              <p >{errors.postal}</p>
            ) : null}
          </div>
          <Button
            sx={{
              color: 'black',
              fontWeight: 'bold',
              backgroundColor: 'white',
            }}
             type='submit'
          >
            Actualizar
          </Button>
        </div>
      </form>
    </div>
  )
}

export default UserEditData
