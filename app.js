async function checkBanStatus() {
    const playerId = document.getElementById('playerId').value;
    const resultDiv = document.getElementById('result');

    if (!playerId) {
        resultDiv.innerHTML = '<span class="error">请输入有效的游戏ID。</span>';
        return;
    }

    const apiUrl = `/api/fetchBanStatus?playerId=${playerId}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('网络无法连接或玩家ID填写错误。错误代码: ' + response.status);
        }

        const data = await response.json();
        const banType = data.data[0]?.attributes?.banType || 'Innocent';

        const banStatus = {
            'Innocent': '<span class="status innocent">未封禁</span>',
            'TemporaryBan': '<span class="status temporaryBan">临时封禁</span>',
            'PermanentBan': '<span class="status permanentBan">永久封禁</span>'
        };

        resultDiv.innerHTML = `玩家 ${playerId} 的封禁状态: ${banStatus[banType] || '<span class="status unknown">未知</span>'}`;
    } catch (error) {
        resultDiv.innerHTML = `<span class="error">查询失败: ${error.message}</span>`;
    }
}
