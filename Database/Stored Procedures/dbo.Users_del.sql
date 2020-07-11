SET QUOTED_IDENTIFIER ON
GO
SET ANSI_NULLS ON
GO

-- ===================================================================
-- Author      : Keiran
-- Create date : 07/08/2020
-- Revised date: 
-- Description : Delete User details
-- ===================================================================

CREATE PROCEDURE [dbo].[Users_del]
  (@ID int)
AS
BEGIN
  SET NOCOUNT ON;
  DELETE FROM [dbo].[Users] WHERE [ID]=@ID;
  SELECT @@ROWCOUNT as [Rows Affected];
END
GO
