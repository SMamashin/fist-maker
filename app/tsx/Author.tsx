import './styles.scss';

const FistMakerAuthor = 
    <>
        <h2>Автор проекта</h2>
        <div className="container">
            <span className='author'>
                <img src="https://avatars.githubusercontent.com/u/107657774?v=4"/>
                <h3>Степан Мамашин <img className="checkIcon" src="https://fistmaker.ru/assets/emoji/check.svg"/></h3>
                <p className="know">Также: Mamashin | SMamashin</p>
                <p><i>- Никогда не поздно.</i> <img className="checkIcon" src="https://fistmaker.ru/assets/emoji/f.gif"/> </p>
                <div className="links">
                    <a className="git" href="https://github.com/SMamashin"><img src="https://fistmaker.ru/assets/emoji/git.png"/>GitHub</a>
                    <a className="bh" href="https://www.blast.hk/members/386859/"><img src="https://fistmaker.ru/assets/emoji/bh.png"/>BlastHack</a>
                    <a className="tg" href="https://t.me/thetraextra"><img src="https://fistmaker.ru/assets/emoji/tg.png"/>Contact</a> <br/>
                </div>
                <a className="site" href="https://smamashin.ru">My Site</a>
            </span>
            <br/>
        </div>

    </>

export default FistMakerAuthor;