import './CardItem.css'

export default function CardItem() {
    return (
        <>
            <div className='card-item'>
                <div className="card-item-name flex-ai-c">
                    <h4 className="text-dwoe">title</h4>
                </div>
                <div className="card-item-link flex-ai-c">
                <span className="card-item-chapter">
                    <i className="cuIcon-rank ci-chapter-icon"></i>
                    第756章
                </span>
                    <a href="" target="_blank">首链接</a>
                    <a href="" target="_blank">后续章节链接</a>
                </div>
                <div className="card-item-button flex-ai-c">
                    <div className="but-success">修改</div>
                    <div className="but-error but-ml">删除</div>
                    <div className="but-success ml-auto">复制首链接</div>
                    <div className="but-success but-ml">复制后续章节链接</div>
                </div>
                <div className="card-item-beizhu">
                    备注
                </div>
            </div>
        </>
    )
}