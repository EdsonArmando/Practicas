import React from 'react'
import { AiOutlineAliwangwang } from 'react-icons/ai';
import { WiCloudyWindy,WiHumidity,WiHorizonAlt } from "react-icons/wi";


export const SideBarData = [
    {
        title: 'Home',
        path: '/',
        icon: <AiOutlineAliwangwang />,
        class: 'nav-text'
    },
    {
        title: 'Experimento 1',
        path: 'Experimento1',
        icon: <WiCloudyWindy />,
        class: 'nav-text'
    },
    {
        title: 'Experimento 2',
        path: 'Experimento2',
        icon: <WiHumidity />,
        class: 'nav-text'
    },
    {
        title: 'Experimento 3',
        path: 'Experimento3',
        icon: <WiHorizonAlt />,
        class: 'nav-text'
    },
    
]