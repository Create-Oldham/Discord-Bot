SET QUOTED_IDENTIFIER ON
GO
SET ANSI_NULLS ON
GO

-- ===================================================================
-- Author      : Keiran
-- Create date : 07/08/2020
-- Revised date: 
-- Description : Upsert User details
-- ===================================================================

CREATE PROCEDURE [dbo].[Users_ups]
(
    @DiscordID NVARCHAR(25),
    @ID INT = NULL,
    @Admin TINYINT = NULL
)
AS
BEGIN
    IF @ID IS NULL
       OR @ID = 0
    BEGIN
        IF NOT EXISTS (SELECT * FROM dbo.Users WHERE DiscordID = @DiscordID)
        BEGIN
            INSERT INTO [dbo].[Users]
            (
                [DiscordID],
                [Admin],
                [points]
            )
            VALUES
            (@DiscordID, @Admin, 0);
            SELECT *
            FROM [dbo].[Users]
            WHERE [ID] = SCOPE_IDENTITY();
        END;
    END;
    ELSE
    BEGIN
        UPDATE [dbo].[Users]
        SET [DiscordID] = @DiscordID,
            [Admin] = @Admin
        WHERE ([ID] = @ID);
        SELECT *
        FROM [dbo].[Users]
        WHERE [ID] = @ID;
    END;
END;
GO
