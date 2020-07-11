SET QUOTED_IDENTIFIER ON
GO
SET ANSI_NULLS ON
GO

-- ===================================================================
-- Author      : Keiran
-- Create date : 07/08/2020
-- Revised date: 
-- Description : Select Equipment details
-- ===================================================================

CREATE PROCEDURE [dbo].[Equipment_sel]
  (@ID int=NULL)
AS
BEGIN
  IF @ID IS NULL OR @ID = 0
    SELECT * FROM [dbo].[Equipment] ORDER BY [ID] ASC;
  ELSE
    SELECT * FROM [dbo].[Equipment] WHERE [ID] = @ID;
END
GO
