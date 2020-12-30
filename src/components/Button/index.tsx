import React, {ButtonHTMLAttributes} from 'react';
import {Container} from './styles';


type Buttonprops = ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<Buttonprops> = ({children, ...rest}) =>{
    return(
            <button {...rest}>{children}</button>     
    );
};


export default Button;