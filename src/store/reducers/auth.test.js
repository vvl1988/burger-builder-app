import reducer from './auth';
import * as ActionTypes from '../actions/actionTypes';

describe('Auth reducer', ()=>{
    it('Should return initial state', ()=>{
        expect(reducer(undefined,{})).toEqual({
            token: null,
            userId: null,
            loading: false,
            error:null,
            authRedirectPath: "/"
          });   
    });

    it('Should store token upon login', ()=>{
        expect(reducer({
            token: null,
            userId: null,
            loading: false,
            error:null,
            authRedirectPath: "/"
          }, {type: ActionTypes.AUTH_SUCCESS, idToken: 'mytoken', userId: 'myid'})).toEqual({
            token: 'mytoken',
            userId: 'myid',
            loading: false,
            error:null,
            authRedirectPath: "/"
          })
        });
});