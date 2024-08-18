const Window = ({window, title, iconpath}) => {

    return (
        <div className="window-container">
            <div className="top-bar">
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <img width={'16px'} height={'16px'} alt="decor" src={iconpath} />
                    <p style={{marginLeft: '5px'}}>{title}</p>
                </div>
                <div style={{height: '100%', marginTop: '-1px', border: 'solid rgba(200, 200, 240, 1) 1px', borderTop: 'none', borderRadius: '0 0 4px 4px'}}>
                    <button style={{width: '28px', borderRadius: '0 0 0 4px'}}><img width={'12px'} height={'12px'} alt="decor" src="/images/bgs/minimize.png" /></button>
                    <button style={{width: '28px', borderLeft: 'none', borderRight: 'none'}}><img width={'12px'} height={'12px'} alt="decor" src="/images/bgs/maximize.png" /></button>
                    <button style={{width: '48px', borderRadius: '0 0 4px 0', background: 'linear-gradient(0deg, rgba(199, 123, 101, 1) 0%, rgba(189, 65, 48, 1) 46%, rgba(189, 65, 48, 1) 50%, rgba(209, 121, 111, 1) 54%, rgba(219, 167, 164, 1) 100%)'}}><img width={'12px'} height={'12px'} alt="decor" src="/images/bgs/close.png" /></button>
                </div>
            </div>
            <div style={{height: 'calc(100% - 24px)', width: '100%'}}>
                {window}
            </div>
            <div className="bottom-bar">

            </div>
        </div>
    )
}

export default Window;