import styled from 'styled-components';

const themes = {
    error: {
        color: 'rgba(114, 28, 36, .7)',
        borderColor: '#f5c6cb',
        backgroundColor: '#F8D7DA',
    },
    info: {
        color: '',
        borderColor: '',
        backgroundColor: '',
    },
    warning: {
        color: '#856404',
        borderColor: '#ffeeba',
        backgroundColor: '#fff3cd',
    }
};

export const Container = styled.div`
    width: 100%;
    font-weight: 400;
    margin: 20px auto;
    padding: 10px 15px;
    border: 1px solid ${({theme}) => themes[theme].borderColor || themes.error.borderColor};
    border-radius: 5px;
    background-color: ${({theme}) => themes[theme].backgroundColor || themes.error.backgroundColor};
    text-align: left;
    color: ${({theme}) => themes[theme].color || themes.error.color};
`;
