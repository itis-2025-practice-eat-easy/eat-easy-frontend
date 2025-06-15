import './Footer.css'

function Footer() {
    return (
        <footer className="footer">
            <ul className="footer__contact-list">
                <li className="footer__contact-item">
                    <img src='./src/assets/footer/mail-icon.svg' alt='Mail' />
                    <span>Email us</span>: example@gmail.com
                </li>
                <li className="footer__contact-item">
                    <img src='./src/assets/footer/phone-icon.svg' alt='Contact'/>
                    <span>Call</span> : +123 45678910
                </li>
                <li className="footer__contact-item">
                    <img src='./src/assets/footer/work-hours-icon.svg' alt='Working Hours Icon' />
                    <span>Working Hours</span> : Monday - Friday, 08 am - 05 pm
                </li>
            </ul>
            <div className="footer__social-icons">
                <img src="./src/assets/footer/SocialMedia.svg" alt="SocialMedia" />
            </div>
            <div className='line'></div>
        </footer>
    )
}

export default Footer