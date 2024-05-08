import {useEffect, useState} from 'react';

const useFetching = (url, opts = {}) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            try {
                const response = await fetch(url, opts);
                if (!response.ok) throw new Error('Error fetching');
                const result = await response.json();
                setData(result)

            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();

        return () => {
            setData(null);
            setError('');
        };

    }, [url]);

    return {data, setData, loading, error};
}

export default useFetching;
