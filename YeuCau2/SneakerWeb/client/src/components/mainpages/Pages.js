import React, { useContext } from 'react';
import Home from './home/Home';
import Register from './auth/Register';
import Product from './product/Product';
import DetailProduct from './detailProduct/DetailProduct';
import { Switch, Route } from 'react-router-dom';
import NotFound from './utils/Not_Found/NotFound';
import Cart from './cart/Cart';
import AdminProducts from './adminProducts/AdminProducts';
import { GlobalState } from '../../GlobalState';
const Pages = () => {
	const state = useContext(GlobalState);
	const [isLogged] = state.userAPI.isLogged;
	const [userInfo] = state.userAPI.userInfo;
	return (
		<Switch>
			<Route path='/' exact component={Home}></Route>
			<Route
				path='/register'
				exact
				component={isLogged ? NotFound : Register}
			></Route>
			<Route path='/product' exact component={Product}></Route>
			<Route path='/product/:id' exact component={DetailProduct}></Route>
			<Route path='/cart' exact component={Cart}></Route>		
			<Route
				path='/admin/products'
				exact
				component={userInfo.role ? AdminProducts : NotFound}
			></Route>
		
			<Route path='*' exact component={NotFound}></Route>
		</Switch>
	);
};

export default Pages;
