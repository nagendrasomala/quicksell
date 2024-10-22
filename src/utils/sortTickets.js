export const sortTickets = (groupedTickets, sortBy) => {
    return groupedTickets.map(group => {
      let sortedTickets = [...group.tickets]; 
      switch (sortBy) {
        case 'priority':
          sortedTickets.sort((a, b) => b.priority - a.priority);
          break;
        case 'title':
          sortedTickets.sort((a, b) => {
            const titleA = typeof a.title === 'string' ? a.title : '';
            const titleB = typeof b.title === 'string' ? b.title : '';
            return titleA.localeCompare(titleB);
          });
          break;
        default:
          break; 
      }
      return { ...group, tickets: sortedTickets }; 
    });
  };
  