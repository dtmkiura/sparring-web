
import { useState, useMemo, FC } from 'react';
import { DataView } from 'primereact/dataview';
import { Tag } from 'primereact/tag';
import { ITest } from '../interfaces/ITest';
import GetAllTest from '../services/svGetAllTest';
import { useNavigate } from 'react-router-dom';
import { Avatar } from 'primereact/avatar';
import av1 from "../assets/random-avatars/avatar-1.jpg"
import av2 from "../assets/random-avatars/avatar-2.jpg"
import av3 from "../assets/random-avatars/avatar-3.jpg"
import av4 from "../assets/random-avatars/avatar-4.jpg"
import av5 from "../assets/random-avatars/avatar-5.jpg"
import av6 from "../assets/random-avatars/avatar-6.jpg"
import av7 from "../assets/random-avatars/avatar-7.jpg"
import av8 from "../assets/random-avatars/avatar-8.jpg"
import av9 from "../assets/random-avatars/avatar-9.png"
import av10 from "../assets/random-avatars/avatar-10.png"
import av11 from "../assets/random-avatars/avatar-11.png"
import av12 from "../assets/random-avatars/avatar-12.png"
import av13 from "../assets/random-avatars/avatar-13.png"
import { timeAgo } from '../helpers/timeAgo';

interface TestListProp  {
    reload: boolean
}

const TestList:FC<TestListProp> = ({reload}) => {
    const move = useNavigate()

    const [tests, setTest] = useState<ITest[]>([]);
 
    const randomAvatars = () => {
        const poolAvatars: string[] = [av1, av2, av3, av4, av5, av6, av7, av8, av9, av10, av11, av12, av13];
        const avatars: string[] = []
        for (let i = 0; i < 7; i++) {
            if ((Math.ceil(Math.random() * 135) % 2)) {
                avatars.push(poolAvatars[Math.ceil(Math.random() * 846) % (poolAvatars.length - 1)])
            }
        }
        return avatars
    }

    useMemo(() => {
        GetAllTest().then((res) => {
            console.log(res)
            switch (res.status) {
                case 200:
                    console.log(res)
                    setTest(res.json.tests);
                    break;
                case 204:
                    setTest([]);
                    break;
                case 401:
                    setTimeout(() => move('/auth/login'), 2000)
                    break;
                case 403:
                    setTimeout(() => move('/auth/login'), 2000)
                    break;
                default:
                    break

            }
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reload]);

    const acceptRatio = () => {
        return Math.ceil((Math.random() * 3288) % 100);
    };

    const itemTemplate = (test: ITest, index: number) => {
        const ratio = acceptRatio();
        return (
            <div className='w-full flex flex-row p-4 border-b cursor-pointer hover:bg-slate-100 max-md:flex-col' key={index} >
                <div className='flex  flex-col gap-2  w-48 max-md:flex-row max-md:w-full max-md:justify-between'>
                    <div className='text-2xl text-light font-bold'>
                        {test.name}
                    </div>
                    <div className='text-xl text-custom_black max-md:hidden'>
                        {test.type == "code" ? "Codificación" : "Pregunta"}
                    </div>
                    <div className=''>
                        {test.tags.map((item, index) => <Tag className='text-white text-sm ml-1 ' severity={'contrast'} key={index} ><li className='pt-1 pi pi-tag'></li> {item}</Tag>)}
                    </div>
                </div>
                <div className=' flex flex-1  flex-col px-8 items-start max-md:my-12'>
                    <div className='text-xl font-light text-dark  w-full items-start border-b pb-2' >
                        ¿ {test.question} ?
                    </div>
                    <div className=' flex flex-col w-fit h-full justify-end '>
                        <div className='font-light text-xl '>
                            Quiénes lo han intentado ?
                        </div>
                        <div className='flex gap-2 '>
                            {randomAvatars().map((value, index) => <Avatar className='' image={value} shape='circle' key={index} />)}
                        </div>
                    </div>
                </div>
                <div className='flex flex-col justify-between max-md:flex-row-reverse'>
                    <div className=' flex flex-row justify-end gap-2 text-custom_black font-semibold text-sm items-center'>
                        <i className='pi pi-history'></i>
                        <div>
                            {timeAgo(test.createdAt.toString())}
                        </div>
                    </div>
                    <div className='flex flex-row gap-2 justify-end items-center'>
                        <div className='text-2xl'>
                            🎯
                        </div>
                        <div className={`${ratio > 50 ? "text-green-400" : "text-red-400"} text-4xl`}>
                            {ratio}%<li className={`text-4xl  pi ${ratio > 50 ? 'pi-arrow-up-right' : 'pi-arrow-down-right'} mx-2`}></li>
                        </div>
                    </div>
                </div>

            </div>
        );
    };

    const listTemplate = (items: ITest[]) => {
        if (!items || items.length === 0) return null;

        const list = items.map((test, index) => {
            return itemTemplate(test, index);
        });

        return <div className="grid grid-nogutter">{list}</div>;
    };

    return (
        <div className="card mb-32">
            <DataView value={tests} listTemplate={listTemplate} />
        </div>
    )
}


export default TestList