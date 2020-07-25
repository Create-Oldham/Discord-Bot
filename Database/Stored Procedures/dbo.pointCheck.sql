SET QUOTED_IDENTIFIER ON
GO
SET ANSI_NULLS ON
GO

-- ===================================================================
-- Author      : Keiran
-- Create date : 07/08/2020
-- Revised date: 
-- Description : Check a users points
-- ===================================================================

CREATE PROCEDURE [dbo].[pointCheck]
(@DiscordID NVARCHAR(25))
AS
BEGIN

    SELECT points AS currentPoints
    FROM dbo.Users
    WHERE DiscordID = @DiscordID;
END;
GO
