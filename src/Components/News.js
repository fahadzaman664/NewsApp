import { useEffect, useState } from 'react';
import React from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState('1');
    const [totalResults, settotalResults] = useState(0);
    const [error, setError] = useState(null);





    //  document.title = `${this.capitilizeFirstLetter(props.category)}-NewsMonkey`;



    const capitilizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);

    }

    const fetchMoreData = async () => {

        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page + 1}&pageSize=${props.pagesize}`;
        setPage(page + 1);
        try {
            let data = await fetch(url);
            if (data.status === 429) {
                throw new Error("Status of 429,You have hit API Request Limit,Rate limit exceeded . Please try again later.");
            }
            let parseData = await data.json();
            if (!parseData.articles) {
                throw new Error('No more articles to load');
            }
            setArticles(articles.concat(parseData.articles));
            settotalResults(parseData.totalResults);
        }
        catch (err) {
            setError(`Failed to load more articles: ${err.message}`);  // Display error message
        }

    };


    const UpdateNews = async () => {
        document.title = `${capitilizeFirstLetter(props.category)}-NewsMonkey`;
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pagesize}`;
        setLoading(true)
        try {
            let data = await fetch(url);
            if (data.status === 429) {
                throw new Error("Status of 429, You have hit API Request Limit. Please try again later.");
            }
            props.setProgress(30);
            let parseData = await data.json();
            props.setProgress(50);

            if (!parseData.articles) {
                throw new Error('No articles found');
            }

            setArticles(parseData.articles)
            settotalResults(parseData.totalResults);
            setLoading(false);
            props.setProgress(100);
        }
        catch (err) {
            setLoading(false);
            setError(`Failed to load articles: ${err.message}`);  // Display error message
            props.setProgress(100);
        }
    }


    useEffect(() => {
        UpdateNews();
    }, [])


    return (
        <>
            <h1 className='text-center' style={{ margin: '30px 0px', marginTop: '90px' }}> NewsMonkey - Top {capitilizeFirstLetter(props.category)} Headlines </h1>
            {loading && <Spinner  ></Spinner>}
            {/* Display error message if there's an error */}
            {error && <div className="alert alert-danger">{error}</div>}

            <InfiniteScroll style={{ overflow: "hidden" }}
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length < totalResults}
                loader={<Spinner />}

                endMessage={
                    articles.length >= totalResults &&
                    <p style={{
                        textAlign: 'center',
                        margin: '20px 0',
                        color: '#999',
                        fontWeight: '500',
                        borderTop: '1px solid #ddd',
                        paddingTop: '10px'
                    }}>
                        <b>You have reached the end of the content.</b>
                    </p>
                }
            >
                <div className='row '>
                    {articles.map((elements, index) => {
                        return <div className='col-md-4' key={`${elements.url}-${index}`}>
                            <NewsItem
                                Title={elements.title ? elements.title : ""}
                                Description={elements.description ? elements.description : ""}
                                ImgUrl={elements.urlToImage}
                                newsUrl={elements.url}
                                author={elements.author}
                                dateandtime={elements.publishedAt}
                                source={elements.source.name}
                            >
                            </NewsItem>
                        </div>
                    })}
                </div>

            </InfiniteScroll>


        </>

    )
}

News.defaultProps = {
    country: 'us',
    pagesize: 8,
    category: 'general'
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string

}
export default News


