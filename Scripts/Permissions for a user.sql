DECLARE @discordID NVARCHAR(25) = N'';


SELECT U.DiscordID,
       E.EquipmentName
FROM dbo.UserEquipmentLink UEL
    INNER JOIN dbo.Equipment E
        ON E.ID = UEL.EquipmentID
    INNER JOIN dbo.Users U
        ON U.ID = UEL.UserID
WHERE U.DiscordID LIKE '%' + @discordID + '%';