import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";


export default class News extends Component {
  apiUrl = "https://newsapi.org/v2/top-headlines?country=in&apiKey=1403f848de544bbd90f41547aa2bad6c";
  constructor(){
      super();
      this.state = {
        articals: [],
        loading: true,
        page: 1,
        pageSize: 9,
        lastPage: 0,
        totalResults: 0
      }
  }

  async fetchData(page) {
    let url = `${this.apiUrl}&page=${page}&pageSize=${this.state.pageSize}`;
    let data = await fetch(url);
    return await data.json();
  }

  async componentDidMount(){
    this.props.setProgress(10);
    this.setState({loading: true});
    this.props.setProgress(30);
    let parsedData = await this.fetchData(this.state.page);
    this.props.setProgress(70);
    this.setState({
      articals: parsedData.articles,
      lastPage: Math.ceil(parsedData.totalResults / this.state.pageSize),
      loading: false,
      totalResults: parsedData.totalResults
    });
    this.props.setProgress(100);
  }

  fetchMoreData = async () => {
    this.props.setProgress(10);
    let page = this.state.page + 1;
    if (page <= this.state.lastPage){
      this.setState({loading: true});
      this.props.setProgress(30);
      let parsedData = await this.fetchData(page);
      this.props.setProgress(70);
      this.setState({
        articals: this.state.articals.concat(parsedData.articles),
        loading: false,
        page: page
      });
    }
    this.props.setProgress(100);
  };

  render() {
    return (
      <>
        <h1 className='text-center' style={{marginTop: '90px'}}>Top Headlines...!</h1>
        {this.state.loading && <Spinner/>}
        {this.state.articals && <InfiniteScroll
          dataLength={this.state.articals.length}
          next={this.fetchMoreData}
          hasMore={this.state.articals.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
          <div className='container'>
            <div className='row mt-3'>
              {this.state.articals.map((element)=>{
                return <div className='col-md-4' key={element.url}>
                  <NewsItem 
                    title={element.title ? element.title : ""} 
                    description={element.description ? element.description : ""} 
                    imageUrl={element.urlToImage ? element.urlToImage : ""} 
                    newsUrl={element.url ? element.url : ""}/>
                </div>
              })}
            </div>
          </div>
        </InfiniteScroll>}
      </>
    )
  }
}
