import { getElement } from './helpers.js'

// TODO: modify this function
const onAddTaskItem = () => {
    // get template
    const taskTemplate = getElement<HTMLTemplateElement>('#templateTask')
    const clone = taskTemplate?.content.cloneNode(true)

    const taskList = getElement<HTMLElement>('#taskList')

    console.log('taskList', { clone, nodeType: clone?.nodeType });

    if (taskList && clone) taskList.insertBefore(clone, taskList.childNodes[taskList.childNodes.length - 2]);
}
