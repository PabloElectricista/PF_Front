import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { putUser, getUserByEmail } from '../../redux/actions'
import { useAuth0 } from '@auth0/auth0-react';
import Loading from '../Loading/Loading';
import './UserProf.css'
import { useNavigate } from 'react-router-dom';


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
  const { isAuthenticated, isLoading, user } = useAuth0()
  const userDetail = useSelector((state) => state.usersEmail)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [error, setErrors] = useState({})
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
    if (isAuthenticated) {
      dispatch(getUserByEmail(user.email))
      console.log(user, "despachado");
    }
  }, [isAuthenticated])
  

  const validate = (input) => {
    const error = {}
    if (input.name && !input.name.match(/^[a-zA-Z ]*$/g)) {
      error.name = 'only letters'
    }
    if (input.lastname && !input.lastname.match(/^[a-zA-Z ]*$/g)) {
      error.lastname = 'only letters'
    }
    if (input.cuil && !input.cuil.match(/^[\d]{1,3}\.?[\d]{3,3}\.?[\d]{3,3}$/)) {
      error.cuil = 'Must be a valid ID number'
    }
    if (input.phone && !input.phone.match(/^\(?\d{2}\)?[\s\.-]?\d{4}[\s\.-]?\d{4}$/)) {
      error.phone = 'Must be a valid phone number'
    }
    if (input.address && !input.address.match(/^[A-Za-z0-9\s]+$/g)) {
      error.address = 'Symbols are not allowed'
    }
    if (input.postal && !input.postal.match(/^(\d{4})$/g)) {
      error.postal = 'Must be a valid ZIP Code'
    }
    return error
  }

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    })
    setErrors(validate({
      ...input,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (Object.values(error).length !== 0) {
      return
    } else {
      const email = userDetail.email
      dispatch(putUser(email, input))
      dispatch(getUserByEmail(email))
      navigate("/profile/data")
    }
  }


  if (isLoading) {
    return <Loading />
  }

  return (
    <>
      <form className="FormDiv" onSubmit={(e) => handleSubmit(e)}>
        <legend className="FormTextArea">Personal Data</legend>
        <div>
          <label className="FormLabel">Country:</label>
          <select name='country' onChange={(e) => handleChange(e)} required>
            <option value=''>Select</option>
            {paises.map((e) => {
              return (<option key={e} value={e}>{e}</option>)
            })}
          </select>
        </div>
        <div>
          <label className="FormLabel">Identification Number: <span className="error"> {error.cuil ? error.cuil : ""}</span></label>
          <input required type='text' name='cuil' onChange={(e) => handleChange(e)} value={input.cuil} />
        </div>
        <div>
          <label className="FormLabel">Birthday: <span className="error"> {error.birthday ? error.birthday : ""}</span> </label>
          <input required type='date' name='birthday' onChange={(e) => handleChange(e)} value={input.birthday} />
        </div>
        <div>
          <label className="FormLabel">Phone: <span className="error"> {error.phone ? error.phone : ""}</span> </label>
          <input required type='text' name='phone' onChange={(e) => handleChange(e)} value={input.phone} />
        </div>
        <div>
          <label className="FormLabel">Address: <span className="error"> {error.address ? error.address : ""}</span> </label>
          <input required type='text' name='address' onChange={(e) => handleChange(e)} value={input.address} />
        </div>
        <div>
          <label className="FormLabel">ZIP Code: <span className="error"> {error.postal ? error.postal : ""}</span> </label>
          <input required type='number' name='postal' onChange={(e) => handleChange(e)} value={input.postal} />
        </div>
        <button className="btn btn-outline-success me-2">Update</button>
      </form>
    </>
  )
}

export default UserEditData
