import './Button.css'
export interface ButtonProps{
    type?: "button" | "submit" | "reset";
    onClick?:(event:React.MouseEvent<HTMLButtonElement>) => void;
    className?:string
    children?:React.ReactNode
}

export default function Button(props: ButtonProps){
    return (
        <button
            type={props.type}
            onClick={props.onClick}
            className='btn'>
            {props.children}
        </button>
    );
}
