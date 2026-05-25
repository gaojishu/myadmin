'use client';

// import { BellOutlined } from '@ant-design/icons';
import { Badge } from 'antd';
import { useEffect, useState } from 'react';
import NoticeTableModal from './NoticeTableModal';
import { notification } from '@/components/GlobalProvider';

export default function Notice() {
    const [count, setCount] = useState(0);
    const [noticeTableModalOpen, setNoticeTableModalOpen] = useState(false);
    // const { subscribe, unsubscribe } = useStomp();

    useEffect(() => {
        // const id = subscribe('/user/queue/notifications', (message: any) => {

        //     console.log('收到消息', message);
        //     const data = message;

        //     setCount(prev => prev + 1);

        //     notification.info({
        //         title: data.title,
        //         description: data.content
        //     });
        // });

        // return () => {
        //     // 可选：你也可以实现 unsubscribe
        //     unsubscribe(id);
        // };
    }, []);



    return (
        <div>
            <NoticeTableModal
                noticeTableModalOpen={noticeTableModalOpen}
                setNoticeTableModalOpen={setNoticeTableModalOpen}
            />
            <Badge count={count} size="small" onClick={() => {
                setCount(0);
                setNoticeTableModalOpen(true);
            }}>
                <div className='hover:text-blue-500 cursor-pointer'>
                    {/* <BellOutlined style={{ fontSize: 22 }} /> */}
                </div>
            </Badge>
        </div>

    );

}