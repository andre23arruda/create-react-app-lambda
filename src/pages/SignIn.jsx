import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router'

import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link'
import Box from '@material-ui/core/Box'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

import { postApi } from '../services/api'
import { title } from '../utils'


const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%',
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}))

export default function SignIn() {
	useEffect(() => {
        title(document, 'Entrar')
	}, [])
	const classes = useStyles()
	const history = useHistory()

	const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

	async function formSubmit(event) {
        event.preventDefault()
        const formData = {
            username,
            password,
        }

        const response = await postApi('login/', formData)
        if (response.token) {
			localStorage.setItem('auth', response.token)
			history.push('/list')
        }
    }

	function validateForm() {
        return (
            username.length > 0 &&
            password.length > 0
        )
    }

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />

			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>

				<h2 align="center">
					Entre com seu usuário para ver as URLs já encurtadas
				</h2>

				<form className={classes.form} onSubmit={ formSubmit }>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="username"
						label="Usuário"
						name="username"
						autoComplete="username"
						autoFocus
						onChange={ e => setUsername(e.target.value) }
					/>

					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
						onChange={ e => setPassword(e.target.value) }
					/>

					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={ classes.submit }
						disabled={ !validateForm() }
					>
						Entrar
					</Button>
				</form>
			</div>

			<Box mt={8}>
				<Typography variant="body2" color="textSecondary" align="center">
					{'Copyright © '}
					<Link color="inherit" href="https://github.com/andre23arruda">
						André Arruda
					</Link>{' '}
					{new Date().getFullYear()}
					{'.'}
				</Typography>
			</Box>
		</Container>
	)
}