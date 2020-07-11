SET QUOTED_IDENTIFIER ON
GO
SET ANSI_NULLS ON
GO

-- ===================================================================
-- Author      : Keiran
-- Create date : 07/08/2020
-- Revised date: 
-- Description : Select User details
-- ===================================================================

CREATE PROCEDURE [dbo].[Users_sel]
  (@ID nvarchar(25)=NULL)
AS
BEGIN
  IF @ID IS NULL OR @ID = 0
    SELECT * FROM [dbo].[Users] ORDER BY [ID] ASC;
  ELSE
    SELECT * FROM [dbo].[Users] WHERE [ID] = @ID;
END
GO
