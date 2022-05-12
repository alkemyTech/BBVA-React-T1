export const getDateString = () => {
    return new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString()
} 