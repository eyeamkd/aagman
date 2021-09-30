import React from 'react'
import { render, screen } from '@testing-library/react'
import Home from '../pages/index'

describe('Home', () => {
    it('renders app logo', () => {
        render(<Home />)

        const logo = screen.getByRole('img', {
            name: /App Logo/i,
        })

        expect(logo).toBeInTheDocument()
    })

    it('renders headings', () => {
        render(<Home />)

        const title = screen.getByRole('heading', {
            name: /Aagman/i,
        })

        expect(title).toBeInTheDocument()

        const tagline = screen.getByRole('heading', {
            name: /Order Without Hassle/i,
        })

        expect(tagline).toBeInTheDocument()
    })

    it('renders links', () => {
        render(<Home />)

        const signUp = screen.getByRole('link', {
            name: /Sign Up/i,
        })

        expect(signUp).toBeInTheDocument()

        const scanQrCode = screen.getByRole('link', {
            name: /Scan QR Code/i,
        })

        expect(scanQrCode).toBeInTheDocument()
    })

})