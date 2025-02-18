function CartItem({ item }) {
  console.log(item);
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      padding: '15px',
      borderBottom: '1px solid #ddd',
      backgroundColor: '#f9f9f9',
      fontFamily: 'Arial, sans-serif',
      color: '#333',
      marginBottom: '10px',
      borderRadius: '5px',
      transition: 'background-color 0.3s ease',
    }} 
    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f1f1f1'} 
    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f9f9f9'}>
      <span style={{
        fontSize: '14px',
        fontWeight: '700',
        color: '#007bff',
        flex: 1,
        textAlign: 'left',
      }}>
        {item.itemName}
      </span>
      <span style={{
        fontSize: '14px',
        fontWeight: '500',
        color: '#28a745',
        flex: 1,
        textAlign: 'center',
      }}>
        {item.itemCost}
      </span>
      <span style={{
        fontSize: '14px',
        fontWeight: '500',
        color: '#fd7e14',
        flex: 1,
        textAlign: 'center',
      }}>
        {item.quantity}
      </span>
      <span style={{
        fontSize: '14px',
        fontWeight: '500',
        color: '#6c757d',
        flex: 1,
        textAlign: 'center',
      }}>
        {item.status}
      </span>
    </div>
  );
          }
