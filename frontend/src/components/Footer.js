import React from 'react'
import '../styles/App.css'

export default function Footer() {
    return (
        <footer className="footer relative bg-white bottom-0 left-0 w-full bottom-0 bg-lightaccent text-center p-6">
            <p className="font-bold text-brown">Takape by AKU</p>
            <a href="https://github.com/keiruu/Takape" target="_blank" rel="noreferrer" className="hover:text-accent">Github repository</a>
            <p>© 2021 Takape. All rights reserved.</p>
        </footer>
    )
}
