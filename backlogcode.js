{rows
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((row) => {
      return (
        <TableRow hover   
      
         role="checkbox" 
         tabIndex={-1} 
         key={row.id}
         className='row'>
          
              <TableCell  style={{maxWidth: 200, color: "gray"}}  >
                  <Link href="#" underline="hover"style={{fontWeight: "bold", color: "gray"}}>
                {row.title}
                  </Link>    
              </TableCell>
              <TableCell  style={{maxWidth: 200}}  >
                  <Button   variant="contained">View</Button>
              </TableCell>
              <TableCell  style={{maxWidth: 200}} align='left'>
                 Community Jameel
              </TableCell>
              <TableCell  style={{maxWidth: 200}} align='center' >
            20
              </TableCell>
              <TableCell  style={{maxWidth: 200}} align='center' >
             10
              </TableCell>
              <TableCell  style={{maxWidth: 200}} align='center' >
              2023-06-14
              </TableCell>
         
             <TableCell align='center'  >  
        
              <Box sx={{ '& > :not(style)': { m: 1 } }} >
                <div className="action-cell" >

                  <Fab color="primary"  className="action-button" aria-label="add" href= '#' onClick={() => handlePost()} >
                     <RocketLaunchIcon/>
                  </Fab>
                  <Fab color="secondary"  className="action-button" aria-label="edit">
                      <FolderDeleteIcon/>
                  </Fab>
                  </div>
                </Box>
 
              </TableCell>
         
        </TableRow>
      );
    })}