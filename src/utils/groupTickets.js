import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardCheck, faHourglassStart, faCheckCircle, faBan, faListUl } from '@fortawesome/free-solid-svg-icons';
import { faExclamationTriangle, faExclamationCircle, faAngleDoubleUp, faAngleDown, faCircle } from '@fortawesome/free-solid-svg-icons'; 

export const groupTickets = (tickets, groupBy, users = []) => {
    switch (groupBy) {
      case 'status':
        return groupByStatus(tickets);
      case 'user':
        return groupByUser(tickets, users);
      case 'priority':
        return groupByPriority(tickets);
      default:
        return tickets;
    }
  };
  

  const groupByStatus = (tickets) => {
    const statuses = [
      { name: 'Todo', icon: faClipboardCheck },
      { name: 'In Process', icon: faHourglassStart },
      { name: 'Done', icon: faCheckCircle },
      { name: 'Canceled', icon: faBan },
      { name: 'Backlog', icon: faListUl }
    ];
  
    return statuses.map((status) => {
      const filteredTickets = tickets.filter((ticket) => ticket.status === status.name);
      return {
        title: (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FontAwesomeIcon icon={status.icon} />
            <span>{status.name}</span>
            <span style={{ color: 'gray' }}>{filteredTickets.length}</span>
          </div>
        ),
        tickets: filteredTickets,
      };
    });
  };
  



  const groupByUser = (tickets, users) => {
    const userMap = Object.fromEntries(users.map((user) => [user.id, user]));
  
    const usersWithTickets = [...new Set(tickets.map((ticket) => ticket.userId))];
    return usersWithTickets.map((userId) => {
      const filteredTickets = tickets.filter((ticket) => ticket.userId === userId);
      const user = userMap[userId] || { name: 'Unassigned' };
      const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`;
  
      return {
        title: (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img 
              src={avatarUrl} 
              alt={`${user.name}'s avatar`} 
              style={{ width: '20px', height: '20px', borderRadius: '50%' }} 
            />
            <span>{user.name}</span>
            <span style={{ color: 'gray' }}>{filteredTickets.length}</span>
          </div>
        ),
        tickets: filteredTickets,
      };
    });
  };
  



  const groupByPriority = (tickets) => {
    const priorityLabels = {
      4: { label: 'Urgent', icon: faExclamationTriangle },
      3: { label: 'High', icon: faExclamationCircle },
      2: { label: 'Medium', icon: faAngleDoubleUp },
      1: { label: 'Low', icon: faAngleDown },
      0: { label: 'No Priority', icon: faCircle },
    };
  
    const priorities = [4, 3, 2, 1, 0];
    return priorities.map((priority) => {
      const filteredTickets = tickets.filter((ticket) => ticket.priority === priority);
      return {
        title: (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FontAwesomeIcon icon={priorityLabels[priority].icon} />
            <span>{priorityLabels[priority].label}</span>
            <span style={{ color: 'gray' }}>{filteredTickets.length}</span>
          </div>
        ),
        tickets: filteredTickets,
      };
    });
  };