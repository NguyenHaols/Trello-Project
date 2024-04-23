
export const mockData = {
  board: {
    _id: 'board-id-01',
    title: 'Board 01',
    description: 'Board description',
    type: 'public', // 'private'
    ownerIds: [], // Những users là Admin của board
    memberIds: [], // Những users là member bình thường của board
    columnOrderIds: ['column-id-01', 'column-id-03', 'column-id-02', 'column-id-04'], // Thứ tự sắp xếp / vị trí của các Columns trong 1 boards
    columns: [
      {
        _id: 'column-id-01',
        boardId: 'board-id-01',
        title: 'To Do Column 01',
        cardOrderIds: ['card-id-01', 'card-id-02', 'card-id-03', 'card-id-04', 'card-id-05', 'card-id-06', 'card-id-07'],
        cards: [
          {
            _id: 'card-id-01',
            boardId: 'board-id-01',
            columnId: 'column-id-01',
            title: 'Title of card 01',
            description: 'Markdown Syntax',
            cover: 'https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/hinh-thien-nhien-3d-002.jpg',
            memberIds: ['test-user-id-01'],
            comments: ['test comment 01', 'test comment 02'],
            attachments: ['test attachment 01', 'test attachment 02', 'test attachment 03']
          },
          { _id: 'card-id-02', boardId: 'board-id-01', columnId: 'column-id-01', title: 'Title of card 02', description: null, cover: null, memberIds: [], comments: [], attachments: [] },
          { _id: 'card-id-03', boardId: 'board-id-01', columnId: 'column-id-01', title: 'Title of card 03', description: null, cover: null, memberIds: [], comments: [], attachments: [] },
          { _id: 'card-id-04', boardId: 'board-id-01', columnId: 'column-id-01', title: 'Title of card 04', description: null, cover: null, memberIds: [], comments: [], attachments: [] },
          { _id: 'card-id-05', boardId: 'board-id-01', columnId: 'column-id-01', title: 'Title of card 05', description: null, cover: null, memberIds: [], comments: [], attachments: [] },
          { _id: 'card-id-06', boardId: 'board-id-01', columnId: 'column-id-01', title: 'Title of card 06', description: null, cover: null, memberIds: [], comments: [], attachments: [] },
          { _id: 'card-id-07', boardId: 'board-id-01', columnId: 'column-id-01', title: 'Title of card 07', description: null, cover: null, memberIds: [], comments: [], attachments: [] }
        ]
      },
      {
        _id: 'column-id-02',
        boardId: 'board-id-01',
        title: 'Inprogress Column 02',
        cardOrderIds: ['card-id-08', 'card-id-09', 'card-id-10'],
        cards: [
          { _id: 'card-id-08', boardId: 'board-id-01', columnId: 'column-id-02', title: 'Title of card 08', description: null, cover: null, memberIds: [], comments: [], attachments: [] },
          { _id: 'card-id-09', boardId: 'board-id-01', columnId: 'column-id-02', title: 'Title of card 09', description: null, cover: null, memberIds: [], comments: [], attachments: [] },
          { _id: 'card-id-10', boardId: 'board-id-01', columnId: 'column-id-02', title: 'Title of card 10', description: null, cover: null, memberIds: [], comments: [], attachments: [] }
        ]
      },
      {
        _id: 'column-id-03',
        boardId: 'board-id-01',
        title: 'Done Column 03',
        cardOrderIds: ['card-id-11', 'card-id-12', 'card-id-13'],
        cards: [
          { _id: 'card-id-11', boardId: 'board-id-01', columnId: 'column-id-03', title: 'Title of card 11', description: null, cover: null, memberIds: [], comments: [], attachments: [] },
          { _id: 'card-id-12', boardId: 'board-id-01', columnId: 'column-id-03', title: 'Title of card 12', description: null, cover: null, memberIds: [], comments: [], attachments: [] },
          { _id: 'card-id-13', boardId: 'board-id-01', columnId: 'column-id-03', title: 'Title of card 13', description: null, cover: null, memberIds: [], comments: [], attachments: [] }
        ]
      },
      {
        _id: 'column-id-04',
        boardId: 'board-id-01',
        title: 'Done Column 04',
        cardOrderIds: ['card-id-04-placehoder-card'],
        cards: [
          { _id: 'card-id-04-placehoder-card',
            boardId: 'board-id-01',
            columnId: 'column-id-04',
            FE_PlacehoderCard:true
          }
        ]
      }

    ]
  }
}

export const MocDataUserAPI = {
  _id: 'user_1',
  email: 'user1@gmail.com',
  username: 'Nguyen Hao',
  avatar: 'https://scontent.fhan14-2.fna.fbcdn.net/v/t39.30808-6/301457307_1133116100610644_3640136920263431766_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_ohc=eoll-zzKJ_cAb5orIxJ&_nc_ht=scontent.fhan14-2.fna&oh=00_AfAb9jwU6B3VhcnfDI8EdaLGjCVd1zd55b1XEGihEtgm-A&oe=661D2CD6',
  roleId:'1',
  starredBoard:['board-01','board-06'],
  workspaces:[
    {
      _id : 'workspace-01',
      ownerId:'user_1',
      title: 'IT company',
      avatar: 'https://scontent.fhan14-2.fna.fbcdn.net/v/t39.30808-6/301457307_1133116100610644_3640136920263431766_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_ohc=eoll-zzKJ_cAb5orIxJ&_nc_ht=scontent.fhan14-2.fna&oh=00_AfAb9jwU6B3VhcnfDI8EdaLGjCVd1zd55b1XEGihEtgm-A&oe=661D2CD6',
      description: 'Đứng trên ngọn đồi hoa sim nở tím biếc, em có thể ngắm nhìn toàn cảnh ngôi làng nhỏ - quê ngoại yêu dấu của em. Đây là một ngôi làng nhỏ mang những đặc trưng thân thuộc nhất của một làng quê bắc bộ. Với những ngôi nhà gạch có mái ngói đỏ tươi, cùng khoảng sân rộng bằng xi măng ở phía trước',
      type: 'Private',
      members: [
        {
          _id: 'user_1',
          email: 'user1@gmail.com',
          username: 'Nguyen Hao',
          Avatar: 'https://scontent.fhan14-2.fna.fbcdn.net/v/t39.30808-6/301457307_1133116100610644_3640136920263431766_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_ohc=eoll-zzKJ_cAb5orIxJ&_nc_ht=scontent.fhan14-2.fna&oh=00_AfAb9jwU6B3VhcnfDI8EdaLGjCVd1zd55b1XEGihEtgm-A&oe=661D2CD6'
        },
        {
          _id: 'user_3',
          email: 'user2@gmail.com',
          username: 'Nguyen Hao b',
          avatar: 'https://scontent.fhan14-2.fna.fbcdn.net/v/t39.30808-6/301457307_1133116100610644_3640136920263431766_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_ohc=eoll-zzKJ_cAb5orIxJ&_nc_ht=scontent.fhan14-2.fna&oh=00_AfAb9jwU6B3VhcnfDI8EdaLGjCVd1zd55b1XEGihEtgm-A&oe=661D2CD6'
        }
      ],
      board: [
        {
          _id: 'board-01',
          ownerId: 'user-01',
          title: 'Learn React',
          type:'public',
          avatar: 'https://images.spiderum.com/sp-images/7386aff0e12f11e9a86fb1e9505dc991.jpg',
        },
        {
          _id: 'board-02',
          ownerId: 'user-01',
          starred:'false',
          title: 'Learn ExpressJs',
          type:'public',
          avatar: 'https://tltvietnam.vn/upload/images/video-deo-hoat-hinh-giai-thich-4.jpg',
        } 
      ]
    },
    {
      _id : 'workspace-02',
      title: 'IT FE',
      avatar: '',
      description: '',
      type: 'Public',
      members: [
        {
          _id: 'user_1',
          email: 'user1@gmail.com',
          username: 'Nguyen Hao 1',
          Avatar: 'https://scontent.fhan14-2.fna.fbcdn.net/v/t39.30808-6/301457307_1133116100610644_3640136920263431766_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_ohc=eoll-zzKJ_cAb5orIxJ&_nc_ht=scontent.fhan14-2.fna&oh=00_AfAb9jwU6B3VhcnfDI8EdaLGjCVd1zd55b1XEGihEtgm-A&oe=661D2CD6'
        },
        {
          _id: 'user_2',
          umail: 'user2@gmail.com',
          username: 'Nguyen Hao 2',
          avatar: 'https://scontent.fhan14-2.fna.fbcdn.net/v/t39.30808-6/301457307_1133116100610644_3640136920263431766_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_ohc=eoll-zzKJ_cAb5orIxJ&_nc_ht=scontent.fhan14-2.fna&oh=00_AfAb9jwU6B3VhcnfDI8EdaLGjCVd1zd55b1XEGihEtgm-A&oe=661D2CD6'
        }
      ],
      board: [
        {
          _id: 'board-06',
          title: 'learn js',
          type:'public',
          avatar: 'https://scontent.fhan14-2.fna.fbcdn.net/v/t39.30808-6/301457307_1133116100610644_3640136920263431766_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_ohc=eoll-zzKJ_cAb5orIxJ&_nc_ht=scontent.fhan14-2.fna&oh=00_AfAb9jwU6B3VhcnfDI8EdaLGjCVd1zd55b1XEGihEtgm-A&oe=661D2CD6',
          ownerId: 'user-02',
        } 
      ]
    }
  ]
}
