import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title, description, imageUrl, newsUrl} = this.props;
    let defaultImageUrl = "https://images.news18.com/ibnlive/uploads/2022/09/pm-modi-s-jaishankar-combined-166391130816x9.png";

    return (
        <div className='my-3'>
            <div className="card" style={{width:'23rem'}}>
                <img src={imageUrl ? imageUrl : defaultImageUrl} className="card-img-top" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title" data-toggle="tooltip" data-placement="auto" title={title}>
                      {title.length < 100 ? title.trim() : title.slice(0, 100).trim()}{title.length > 100 ? "...": ""}
                    </h5>
                    <p className="card-text">{description.slice(0, 88)}</p>
                    <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-primary">Read More</a>
                </div>
            </div>
        </div>
    )
  }
}

export default NewsItem