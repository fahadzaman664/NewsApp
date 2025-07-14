import React from 'react'

 const NewsItem = (props)=> {
 
        return (
            <div className='my-3'>
                <div className="card" >
                    <div style={{display:'flex', justifyContent:'flex-end', position:'absolute',
                        right:0
                     }}>
                     <span className="badge rounded-pill bg-danger" >  {props.source}
                        </span> 
                        </div>
                    <img src={!props.ImgUrl ? "https://img.global.news.samsung.com/global/wp-content/uploads/2025/05/Samsung-Mobile-Galaxy-S25-Edge-Corning-Incorporated-Corning%C2%AE-Gorilla%C2%AE-Glass-Ceramic-2_Thumb728.jpg" : props.ImgUrl} className="card-img-top" alt="news" />
                    <div className="card-body">
                        <h5 className="card-title">{props.Title} </h5>
                        <p className="card-text">{props.Description}</p>
                        <p className='card-text'> <small className='text-muted'> By {!props.author ? "Unknown" : props.author} on {new Date(props.dateandtime).toGMTString()}</small></p>
                        <a href={props.newsUrl} rel="noreferrer" target='_blank' className="btn bt-sm  btn-dark">Read More</a>
                    </div>
                </div>

            </div>




        )
    }


export default NewsItem
