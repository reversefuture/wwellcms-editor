import React from 'react'
import './style.scss'
import CONFIG from '@/config'

const currentYear = new Date().getFullYear()

export default () => {
  return (
    <footer className="global-footer">
      <div>
        Copyright &copy; 2019-{currentYear} {CONFIG.title} -
        <a
          href="https://github.com/reversefuture"
          target="_blank"
          rel="noopener noreferrer"
        >
          {' '}
          xiejiahe
        </a>
      </div>
    </footer>
  )
}
