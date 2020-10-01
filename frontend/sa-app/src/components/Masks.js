import React, {Component} from 'react';
import startImage from '../assets/257ea-6e13f-icon-cloud-aws.png';
import {AppBar, Toolbar} from "@material-ui/core";
import axios from 'axios';
import Carousel from 'react-material-ui-carousel';
import {Paper} from '@material-ui/core';


//mock data
let items = [
  {
    "description": "replace your breakfast",
    "id": "4635f631-7",
    "price": "4.99",
    "image": "https://sa-launch-app-maskimagesbucket28734a57-1wp3js8j614vp.s3.amazonaws.com/chocolate_face-replace%20your%20breakfast-4.99.png?AWSAccessKeyId=ASIAWVEN62T7WJKJMNCP&Signature=stGMfthyKBtUoI6Z3n%2F20QvBtDw%3D&x-amz-security-token=IQoJb3JpZ2luX2VjEFQaCXVzLXdlc3QtMiJIMEYCIQCBuh%2F11bXzaqr%2F9c8p7dZHXHBQp4A0Mrm%2FDdvpPxVrGwIhAJFatv7AVNecj5CNMhbVrZ%2BCjOnhfJuO6snPmrWru%2FkVKu4BCH0QABoMNDU3NzExNzM2MDYzIgw8j8dfze8MrC%2BgbPMqywG6eYOwr0S32ZxHzZYQcT7bM%2BQBNFzzKP5MsILobAIjDBKzB3d95Rl5XNM5IE3IDu1Y8vWkyE6fIxpYoPg%2F4H8JpjfCzWA47UQ4RDyTI1lJJWbe80tCd0ApPzTQBpTAoNzASPWIfcW6nM5X%2FB1Iil6kDUP1Xi%2Bw%2FOOJqsiPHMDlL3a%2BS8kS0ZpqOslOIE4sfIaBdAthVNoklUcVfDcGxd9a9qijLJ7c10xvVo9pj6c5O6ELOmqNsBibtIgasCqh0M9OaFk7Nbu4xjrAsjDi5tj7BTrfAbZoF46rc5fJ%2Fv3HLwZfG9jrQPs4q8bCkbX11qlmU2f0kHZE%2F6mlelV2CDby6Ht%2FXnwvSmcdmlNy330QQZhYOU8Dsljf14ys3QUMlIvCJb3LLuaoU11pXZQuLeTRG0ZsLTlW%2Fq%2FBCUaZrAUPygZAOA5QeUK9jqTvXh2YEQcHoWKkzsgMuVFE72Rj9nof1oJM%2FQBBHqwhHjG6ZDG0XbldqwsTf2Pb%2FJTDmDu5cHqciQ68fYQ0ysGzwMX1jeZ%2Fwrh2PWm0uO4tQ1BUfqDtb1jveOExJrpW9wB%2BnPNGw2keOnI%3D&Expires=1601591923",
    "mask_name": "chocolate_face"
  },
  {
    "description": "new mask",
    "id": "66a187d7-5",
    "price": "6.99",
    "image": "https://sa-launch-app-maskimagesbucket28734a57-1wp3js8j614vp.s3.amazonaws.com/halloween-new%20mask-6.99.png?AWSAccessKeyId=ASIAWVEN62T7WJKJMNCP&Signature=8GeR5ElgsMuyUyhyNmaUpL8OpUQ%3D&x-amz-security-token=IQoJb3JpZ2luX2VjEFQaCXVzLXdlc3QtMiJIMEYCIQCBuh%2F11bXzaqr%2F9c8p7dZHXHBQp4A0Mrm%2FDdvpPxVrGwIhAJFatv7AVNecj5CNMhbVrZ%2BCjOnhfJuO6snPmrWru%2FkVKu4BCH0QABoMNDU3NzExNzM2MDYzIgw8j8dfze8MrC%2BgbPMqywG6eYOwr0S32ZxHzZYQcT7bM%2BQBNFzzKP5MsILobAIjDBKzB3d95Rl5XNM5IE3IDu1Y8vWkyE6fIxpYoPg%2F4H8JpjfCzWA47UQ4RDyTI1lJJWbe80tCd0ApPzTQBpTAoNzASPWIfcW6nM5X%2FB1Iil6kDUP1Xi%2Bw%2FOOJqsiPHMDlL3a%2BS8kS0ZpqOslOIE4sfIaBdAthVNoklUcVfDcGxd9a9qijLJ7c10xvVo9pj6c5O6ELOmqNsBibtIgasCqh0M9OaFk7Nbu4xjrAsjDi5tj7BTrfAbZoF46rc5fJ%2Fv3HLwZfG9jrQPs4q8bCkbX11qlmU2f0kHZE%2F6mlelV2CDby6Ht%2FXnwvSmcdmlNy330QQZhYOU8Dsljf14ys3QUMlIvCJb3LLuaoU11pXZQuLeTRG0ZsLTlW%2Fq%2FBCUaZrAUPygZAOA5QeUK9jqTvXh2YEQcHoWKkzsgMuVFE72Rj9nof1oJM%2FQBBHqwhHjG6ZDG0XbldqwsTf2Pb%2FJTDmDu5cHqciQ68fYQ0ysGzwMX1jeZ%2Fwrh2PWm0uO4tQ1BUfqDtb1jveOExJrpW9wB%2BnPNGw2keOnI%3D&Expires=1601591923",
    "mask_name": "halloween"
  },
  {
    "description": "best mask for covid",
    "id": "130689ee-9",
    "price": "1.99",
    "image": "https://sa-launch-app-maskimagesbucket28734a57-1wp3js8j614vp.s3.amazonaws.com/covid-best%20mask%20for%20covid-1.99.png?AWSAccessKeyId=ASIAWVEN62T7WJKJMNCP&Signature=%2BW6Af3LviDwCJ3qf%2BOZRhl1%2FpJk%3D&x-amz-security-token=IQoJb3JpZ2luX2VjEFQaCXVzLXdlc3QtMiJIMEYCIQCBuh%2F11bXzaqr%2F9c8p7dZHXHBQp4A0Mrm%2FDdvpPxVrGwIhAJFatv7AVNecj5CNMhbVrZ%2BCjOnhfJuO6snPmrWru%2FkVKu4BCH0QABoMNDU3NzExNzM2MDYzIgw8j8dfze8MrC%2BgbPMqywG6eYOwr0S32ZxHzZYQcT7bM%2BQBNFzzKP5MsILobAIjDBKzB3d95Rl5XNM5IE3IDu1Y8vWkyE6fIxpYoPg%2F4H8JpjfCzWA47UQ4RDyTI1lJJWbe80tCd0ApPzTQBpTAoNzASPWIfcW6nM5X%2FB1Iil6kDUP1Xi%2Bw%2FOOJqsiPHMDlL3a%2BS8kS0ZpqOslOIE4sfIaBdAthVNoklUcVfDcGxd9a9qijLJ7c10xvVo9pj6c5O6ELOmqNsBibtIgasCqh0M9OaFk7Nbu4xjrAsjDi5tj7BTrfAbZoF46rc5fJ%2Fv3HLwZfG9jrQPs4q8bCkbX11qlmU2f0kHZE%2F6mlelV2CDby6Ht%2FXnwvSmcdmlNy330QQZhYOU8Dsljf14ys3QUMlIvCJb3LLuaoU11pXZQuLeTRG0ZsLTlW%2Fq%2FBCUaZrAUPygZAOA5QeUK9jqTvXh2YEQcHoWKkzsgMuVFE72Rj9nof1oJM%2FQBBHqwhHjG6ZDG0XbldqwsTf2Pb%2FJTDmDu5cHqciQ68fYQ0ysGzwMX1jeZ%2Fwrh2PWm0uO4tQ1BUfqDtb1jveOExJrpW9wB%2BnPNGw2keOnI%3D&Expires=1601591923",
    "mask_name": "covid"
  }
]

function Item(props)
{
    return (
        <Paper>
            <h2>{props.item.mask_name}</h2>
            <h3>${props.item.price}</h3>
            <img src={props.item.image} width="400" alt="aws" height="500"/>
            <p>{props.item.description}</p>
        </Paper>
    )
}


class Masks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            dataSource: {}
        };
    }

    // real data from api_gateway
    async componentDidMount() {
        //const api = 'https://kqco15q9h0.execute-api.us-west-2.amazonaws.com/prod';
        // axios
        //     .get(api, {
        //         headers: { 'Access-Control-Allow-Origin': '*'},
        //         body: JSON.stringify(result)
        //     })
        //     .then((response) => {
        //         let responseJson = response;
        //         this.setState(
        //             {
        //                 isLoading: false,
        //                 dataSource: responseJson
        //             },
        //             function () {
        //             }
        //         );
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     });


    }


    render() {
        const header = (<div>
            <AppBar position="static" id="header" color="primary" elevation={1}>
                <Toolbar style={{"minWidth": "100", "dipslay": "flex", "justifyContent": "space-between"}}>
                    <h2>AWSoMASK</h2>
                    <img src={startImage} width="170" alt="aws" height="100"/>
                </Toolbar>
            </AppBar>
        </div>)
        let body;

        let {dataSource} = this.state;


        body = (
            <Carousel>
                {
                    items.map( (item, i) => <Item key={i} item={item} /> )
                }
            </Carousel>

        );

        return [header, body]
    }
}

export default Masks;